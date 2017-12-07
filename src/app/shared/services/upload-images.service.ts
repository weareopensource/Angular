import { Injectable } from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class UploadImagesService {

  private IMAGES_FOLDER = 'images';

  constructor(/*public af: AngularFire*/) { }

  listLastImages(numberOfImages: number)/*: FirebaseListObservable<any[]>*/{
/*
    return this.af.database.list(`/${this.IMAGES_FOLDER}`, {
      query: {
        limitToLast: numberOfImages
      }
    });
*/
  }

  uploadImagesToFirebase(files: File[]) {
/*
    const storageRef = firebase.storage().ref();

    _.each(files, (item: FileItem) => {

      item.isUploading = true;

      const uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.IMAGES_FOLDER}/${item.file.name}`).put(item.file);

      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => item.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
        (error) => {},
        () => {
          item.url = uploadTask.snapshot.downloadURL;
          item.isUploading = false;
          this.saveImage({ name: item.file.name, url: item.url });
        }
      );
    })
*/
 }

 private saveImage(image: any) {
//   this.af.database.list(`/${this.IMAGES_FOLDER}`).push(image);
 }
}
