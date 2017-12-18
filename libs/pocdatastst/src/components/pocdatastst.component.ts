import { Component, OnInit, DoCheck } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';

import * as _ from 'lodash';

import { PocdataststService, KeysPipe } from '../services/index';
import { PocExecution } from '../models/pocexecution';
import { maxValueValidator, minValueValidator, numberValueValidator, minLengthValidator } from '../directives/index'

@Component({
  templateUrl: './pocdatastst.component.html',
  styleUrls: ['./pocdatastst.component.scss'],
  providers: [PocdataststService, KeysPipe]
})
export class PocdataststComponent implements OnInit, DoCheck {
  form: FormGroup;
  private availableApis: any[];
  private initAvailableApis: any[]; // A copy of availableApis
  selectedApis: any[] = [];
  private oldSelectedApis: any[] = [];  // A backup of selectedApis
  errorMsg: Array<string> = []; //error
  displayResult: boolean = false; // Display or not the block of result
  executing: boolean;
  private executions: any[] = [];
  private isOpened: boolean[] = [];
  private subscriptions: Subscription[] = [];
  inputsList: any = [];

  // Labels
  private okStatus: string = 'OK';
  private koStatus: string = 'KO';
  private runningStatus: string = 'Running';
  private cancelledStatus: string = 'Cancelled';

  constructor(private _fb: FormBuilder, private pocdataststService: PocdataststService) {
    this.form = this._buildForm();
    //console.log('TOTOTOTO', (this.form.get('adaptativeInputs') as FormArray).at(0).get('inputLanguage').hasError('required'));
    //console.log('TITITTITI', (_.keys((this.form.get('adaptativeInputs') as FormArray).at(0).value)));
  }

  ngOnInit() {
    // Init of the APIs list
    this.pocdataststService.getApisList()
      .subscribe(
      (result) => {
        // For toggle-switch inputs, we add an extra input for its own state (checked/unchecked)
        result.map(api => {
          api.inputs.map(input => {
            if (input.key && input.kind && input.kind === 'toggle-switch') {
              var keyToggle = input.key + '_toggle';
              input.keyToggle = keyToggle;
            }

            return input;
          });

          return api;
        });


        this.availableApis = result.slice(0);
        this.initAvailableApis = result.slice(0);;
        this.errorMsg = [];
      },
      (error) => {
        console.log("error", JSON.parse(error._body));
        this.errorMsg.push(JSON.parse(error._body).message);
      });
  }

  ngDoCheck() {
    // Every time selectedApis change, we update the form with new form controls
    if (!_.isEqual(this.oldSelectedApis, this.selectedApis)) {
      this.buildInputsList(this.selectedApis.slice(0));
      this.form = this._updateForm();
      this.oldSelectedApis = this.selectedApis.slice(0);
    }
  }


  /********************************************************************************************************************************************
  ****************************************************** FUNCTIONS OF EXECUTIONS MANAGEMENT **************************************************
  /********************************************************************************************************************************************/
  // Functions enbaling to lunch the excecution of all selected APIs
  private execute(form: any) {
    let input = form.value;
    this.displayResult = true;
    this.executing = true;
    this.toggleInputState(form);
    let index = 0;
    this.executions = [];
    let previousOutputs;

    let pocExec = new PocExecution(this.selectedApis[0]._id, this.selectedApis[0].code, this.selectedApis[0].name, input, this.runningStatus);
    this.executions.push(pocExec);
    this.recursiveExecution(form, pocExec, input, index, previousOutputs);
  }

  private recursiveExecution(form: any, pocExec: PocExecution, input: any, index: number, previousRes: any) {
    let subscription = this.pocdataststService.submitExecution(pocExec)
      .finally(() => {
        // If executing === false then we asked for cancelling current execution via stop button
        if (!this.executing) {
          this.executions[index].status = this.cancelledStatus;
          this.executions[index].result = [{ message: 'Execution cancelled' }];
        }

        // Last execution
        if (index === this.selectedApis.length - 1) {
          // We update the executing flag
          this.executing = false;
          // We enable inputs form
          this.toggleInputState(form);
          // We open the result automatically
          this.executions[index].isOpened = true;
        }

        // We scroll to the block of the result
        this.goToResult(index);

        // At this moment, current execution is done => we deal with the next...
        index++;

        // ... if there is a next one
        if (index < this.selectedApis.length) {
          // Executions not cancelled
          if (this.executing) {
            // Here, we bind the previous results with the next inputs
            // Is there a previous execution result ?
            if (previousRes.length > 0) {
              // So for Each result of the previous execution...
              _.forEach(previousRes, p => {
                // ...is there one input key corresponding with a previous result key ? => We use this new value instead of the value provided by the form
                if (_.has(input, p.key))
                  input[p.key] = _.get(p, 'message', '')
              });
            }

            // We initiate the next execution
            pocExec = new PocExecution(this.selectedApis[index]._id, this.selectedApis[index].code, this.selectedApis[index].name, input, this.runningStatus);
            this.executions.push(pocExec);
            // We call it
            this.recursiveExecution(form, pocExec, input, index, previousRes);

          } else {
            // Executions is cancelled
            // We cancelled all following executions
            let subIndex = index;
            _.forEach(this.selectedApis, api => {
              if (subIndex < this.selectedApis.length) {
                pocExec = new PocExecution(this.selectedApis[subIndex].id, this.selectedApis[subIndex].code, this.selectedApis[subIndex].name, input, this.cancelledStatus, [{ message: 'Execution cancelled' }]);
                this.executions.push(pocExec);
                subIndex++;
              }
            });
          }
        }
      })
      .subscribe(
      (res) => {
        // Execution status
        this.executions[index].status = this.okStatus;
        // Execution result
        this.executions[index].result = res.outputs;
        // Backup of execution result
        previousRes = this.executions[index].result.slice(0);
      },
      (error) => {
        console.log("error", JSON.parse(error._body));
        // Execution status
        this.executions[index].status = this.koStatus;
        // Execution result
        this.executions[index].result = JSON.parse(error._body).outputs;
        // Backup of execution result
        previousRes = [];
      });

    if (this.executing) {
      this.subscriptions.push(subscription);
    }
  }

  // Function enbaling to cancel running executions
  stopExecution(form: any) {
    this.executing = false;
    this.toggleInputState(form);

    _.forEach(this.subscriptions, sub => {
      sub.unsubscribe();
    });

    this.subscriptions = [];
  }


  /********************************************************************************************************************************************
  *************************************************** FUNCTIONS OF FORM MANAGEMENT ************************************************************
  ********************************************************************************************************************************************/
  // Function iniating the form
  private _buildForm() {
    return this._fb.group({
    });
  }

  // Function updating the form returning the new group of the form with corresponding inputs
  private _updateForm() {
    let group = {};

    _.forEach(this.inputsList, input => {
      let inputKey = input.key;
      let inputValue = input.defaultValue || null;
      let inputValidators = [];

      // We map validators
      _.forEach(input.validators, validator => {
        if (_.get(validator, 'required.value')) {
          inputValidators.push(Validators.required);
        }

        if (_.get(validator, 'numberValue.value')) {
          inputValidators.push(numberValueValidator());
        }

        if (_.get(validator, 'minValue.value') !== null && _.get(validator, 'minValue.value') !== undefined) {
          inputValidators.push(minValueValidator(validator.minValue.value, validator.minValue.strict));
        }

        if (_.get(validator, 'maxValue.value') !== null && _.get(validator, 'maxValue.value') !== undefined) {
          inputValidators.push(maxValueValidator(validator.maxValue.value, validator.maxValue.strict));
        }

        if (_.get(validator, 'minLength.value') !== null && _.get(validator, 'minLength.value') !== undefined) {
          inputValidators.push(minLengthValidator(validator.minLength.value, validator.minLength.strict));
        }
      });

      group = Object.assign(group, {
        [inputKey]: new FormControl(inputValue, inputValidators)
      });

      // For toggle-switch inputs, we add an extra FormControl for its state (checked/unchecked)
      if (input.keyToggle) {
        group = Object.assign(group, {
          [input.keyToggle]: new FormControl(input.checkedState, Validators.required)
        });
      }
    });

    // We provide the new group to the form
    return this._fb.group(group);
  }

  // Function building the inputs list according to the selected APIs
  buildInputsList(apisList) {
    this.inputsList = [];
    let prevApi;
    
    // Here, the input of the last api selected replace the same input already inserted by the previous api
    if (apisList && apisList.length > 0) {
      _.forEach(apisList, api => {
        if (!prevApi) {
          // For the 1st element, we push all its inputs
          this.inputsList = _.concat(_.cloneDeep(_.get(api, 'inputs', [])), this.inputsList.slice(0));
        } else {
          _.forEach(api.inputs, input => {

            /**************************************** */
            // We are looking for the most constraining validator between the current API inserted and the previous APIs
            // Input already used ?
            let inputUsedIndex = _.findIndex(this.inputsList, i => i.key === input.key);

            if (inputUsedIndex !== -1) {
              _.forEach(input.validators, validator => {
                
                // Validator already used ?
                let inputValidatorIndex = _.findIndex(this.inputsList[inputUsedIndex].validators, v => _.keysIn(v)[0] === _.keysIn(validator)[0]);

                // required
                if (validator.required && validator.required.value) {
                  if (this.inputsList[inputUsedIndex].validators[inputValidatorIndex] && this.inputsList[inputUsedIndex].validators[inputValidatorIndex].required && this.inputsList[inputUsedIndex].validators[inputValidatorIndex].required.value) {
                    if (validator.required.value > this.inputsList[inputUsedIndex].validators[inputValidatorIndex].required.value) {
                      // Previous API used the same required validator and its value is bigger => we used the new value (true > false)
                      this.inputsList[inputUsedIndex].validators[inputValidatorIndex].required.value = validator.required.value;
                    }
                  } else {
                    // The previous API doesn't use this validator => we force its usage
                    this.inputsList[inputUsedIndex].validators.push({required: _.cloneDeep(validator.required)});
                  }
                }

                // minValue
                if (validator.minValue && validator.minValue.value) {
                  if (this.inputsList[inputUsedIndex].validators[inputValidatorIndex] && this.inputsList[inputUsedIndex].validators[inputValidatorIndex].minValue && this.inputsList[inputUsedIndex].validators[inputValidatorIndex].minValue.value) {
                    if (validator.minValue.value > this.inputsList[inputUsedIndex].validators[inputValidatorIndex].minValue.value) {
                      // Previous API used the same minValue validator and its value is smaller => we used the new value
                      this.inputsList[inputUsedIndex].validators[inputValidatorIndex].minValue.value = validator.minValue.value;
                    }
                  } else {
                    // The previous API doesn't use this validator => we force its usage
                    this.inputsList[inputUsedIndex].validators.push({minValue: _.cloneDeep(validator.minValue)});
                  }
                }

                // maxValue
                if (validator.maxValue && validator.maxValue.value) {
                  if (this.inputsList[inputUsedIndex].validators[inputValidatorIndex] && this.inputsList[inputUsedIndex].validators[inputValidatorIndex].maxValue && this.inputsList[inputUsedIndex].validators[inputValidatorIndex].maxValue.value) {
                    if (validator.maxValue.value < this.inputsList[inputUsedIndex].validators[inputValidatorIndex].maxValue.value) {
                      // Previous API used the same maxValue validator and its value is bigger => we used the new value
                      this.inputsList[inputUsedIndex].validators[inputValidatorIndex].maxValue.value = validator.maxValue.value;
                    }
                  } else {
                    // The previous API doesn't use this validator => we force its usage
                    this.inputsList[inputUsedIndex].validators.push({maxValue: _.cloneDeep(validator.maxValue)});
                  }
                }

                // minLength
                if (validator.minLength && validator.minLength.value) {
                  if (this.inputsList[inputUsedIndex].validators[inputValidatorIndex] && this.inputsList[inputUsedIndex].validators[inputValidatorIndex].minLength && this.inputsList[inputUsedIndex].validators[inputValidatorIndex].minLength.value) {
                    if (validator.minLength.value > this.inputsList[inputUsedIndex].validators[inputValidatorIndex].minLength.value) {
                      // Previous API used the same minLength validator and its value is bigger => we used the new value
                      this.inputsList[inputUsedIndex].validators[inputValidatorIndex].minLength.value = validator.minLength.value;
                    }
                  } else {
                    // The previous API doesn't use this validator => we force its usage
                    this.inputsList[inputUsedIndex].validators.push({minLength: _.cloneDeep(validator.minLength)});
                  }
                }
              });
            }

            /**************************************** */

            let i = _.findIndex(prevApi.outputs, o => o.key === input.key);
            // If the input of the current api is not included in the outputs of the previous api, we add it to the list
            if (i === -1) {
              this.inputsList.push(input);
            }
          });
        }

        prevApi = api;
      });

      // One input by key
      this.inputsList = _.uniqBy(this.inputsList, 'key');
    }
  }

  // Function keeping the most constraining validator
  private mostConstrainingVal(apisList){

  }

  // Function enabling/disabling inputs form
  private toggleInputState(form: any) {
    let DOM_controls = _.keys(form.controls);

    _.forEach(DOM_controls, DOM_control => {
      this.executing ? form.get(DOM_control).disable() : form.get(DOM_control).enable();
    });
  }

  // Function updating the placeholder of toggle-switch component
  changeToggleSwitchPlaceholder(event: any, item: any) {
    let index = _.findIndex(this.inputsList, (input) => {
      return input.key === item.key
    });

    if (index !== -1)
      this.inputsList[index].checkedState = event.checked
  }

  // Function enbaling to add all provided APIs to the selected list
  addAllApis() {
    this.form.reset();
    this.selectedApis = _.concat(this.availableApis.slice(0), this.selectedApis);
    this.availableApis = [];
  }

  // Function enbaling to empty the selected APis list and reuse the original list of APIs provided
  resetSelectedApis() {
    if (this.selectedApis && this.selectedApis.length > 0) {
      this.form.reset();
      this.availableApis = this.initAvailableApis.slice(0);
      this.selectedApis = [];
    }
  }

  // Function enbaling to deselect an API
  removeItem(item: any) {
    if (this.selectedApis == null || this.executing)
      return;

    this.form.reset();
    _.remove(this.selectedApis, col => col === item);
    this.availableApis.push(item);
  }

  // Function enbaling to select an API
  addItem(item: any) {
    if (this.selectedApis == null || this.executing)
      return;

    this.form.reset();
    _.remove(this.availableApis, api => api === item);
    this.selectedApis.push(item);
  }

  // Function called when form is submitted
  onSubmit(form: any) {
    console.log('form.contains', form.contains('ratioWords'))
    console.log('form.controls', form.controls)
    console.log('form.controls', form.get('text'))

    if (form.valid && this.selectedApis.length > 0) {
      this.execute(form);
    } else {
      return
    }
  }

    
  /********************************************************************************************************************************************
  ********************************************************** VARIOUS FUNCTIONS ***************************************************************
  ********************************************************************************************************************************************/
  // Function enabling to scroll to the block of the result
  private goToResult(index: number) {
    let id = `#apiCall-${index}`;
    let selector = document.querySelector(id);

    if (selector)
      document.querySelector(id).scrollIntoView();
  }

  // Function enabling open/close the block of the result
  toggleOpen(event: MouseEvent, index: number): void {
    event.preventDefault();
    this.executions[index].isOpened = !this.executions[index].isOpened;
  }
}
