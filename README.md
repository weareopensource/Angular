# WAOS Angular
[![Build Status](https://travis-ci.org/weareopensource/meanjs-2.svg?branch=master)](https://travis-ci.org/weareopensource/meanjs-2)
## Angular 5 / material / ngRx Starter 
## Presentation 
This project is part of MEANie stack but can be ran as a standalone application. It's build upon angular 5+ , [angular material](https://github.com/angular/material2), [angular-cli](https://github.com/angular/angular-cli) / [Nx](https://github.com/nrwl/nx) and [ngRx](https://github.com/ngrx).
<br><br><br>
![demo-stack](https://raw.githubusercontent.com/weareopensource/Angular/assets/screenshot.png)

## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:
* Git - [Download & Install Git](https://git-scm.com/downloads)
* Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) or [GitHub Gist](https://gist.github.com/isaacs/579814)

## Installation
It's straightforward
```bash
$ git clone https://github.com/weareopensource/Angular.git
$ npm i
```

## Running Your Application
   ### Development
   * Run `npm start` for a dev server. Navigate to `http://localhost:4200/`.
   ### Production
   * Run `npm run start:prod` to build your client app and start a web server on `http://localhost:4200/`

<!--
## Running unit tests
Run `npm run test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests
Run `npm run e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
-->

## Developper Guide
In order to develop some feature modules with respect of the starter structure, for instance, if you wand to add an entry point to the sidenav, you should provide a configuration object to the core-state module that manages the content of sidenav. Your configuration file consists of an object with an entry called `core` witch have the following structure
```
export const myFeatureConfiguration: FeatureConfiguration = {
  ... // myFeature can provide a configuration for different modules
  core: {  // coreModule configuration
    sidenav: [{
      order: number;
      link: string, // ie the URL path to access the module
      name: string,  // ie the name appears on the sidenav
      icon: string; // ie the svg material icon that correspond to your feature. It follows the rule: set:ic___<icon_name>____24px
    }]
  }
  ...
};
```
Your feature can provide multiple entries to the sidenav since the `menuItems` entry is an array.
Once defined, you have to pass the configuration to the core-state module (ie the core module part that manages the datas or state) when it's initilizing.
<br>
app.module.ts:
```
  ...
  CoreStateModule.forRoot([..., myFeatureConfiguration.core]),
  ...
```
<br>
To modify the logo and the title, directy edit the `self` entry of the coreConfiguration object.
<br>
core.configuration.ts:
```
export const coreConfiguration: CoreConfiguration = {
  self: {
    ...
    logo: '/assets/rominet-logo.svg',
    title: 'Angular starter',
    ...
  }
};
```

## Contributing
We welcome pull requests from the community! Want to contribute ? It's simple as
  * Forking the repository
  * Making a PR

## License
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](/LICENSE.md)
