[![Build Status](https://badges.weareopensource.me/travis/weareopensource/Angular.svg?style=flat-square)](https://travis-ci.org/weareopensource/Angular) [![Code Climate](https://badges.weareopensource.me/codeclimate/maintainability-percentage/weareopensource/Angular.svg?style=flat-square)](https://codeclimate.com/github/weareopensource/Angular/maintainability)
 [![Dependencies Status](https://david-dm.org/weareopensource/Angular.svg?style=flat-square)](https://david-dm.org/weareopensource/Angular)
 [![Known Vulnerabilities](https://snyk.io/test/github/weareopensource/Angular/badge.svg?style=flat-square)](https://snyk.io/test/github/weareopensource/Angular)

[![Blog](https://badges.weareopensource.me/badge/Read-On%20our%20Blog-1abc9c.svg?style=flat-square)](https://weareopensource.me) [![Slack](https://badges.weareopensource.me/badge/Chat-On%20Slack-d0355b.svg?style=flat-square)](mailto:weareopensource.me@gmail.com?subject=Join%20Slack&body=Hi,%20I%20found%20your%20community%20We%20Are%20Open%20Source.%20I%20would%20be%20interested%20to%20join%20the%20Slack%20to%20share%20and%20discuss%20about%20...%20,%20Thanks) [![Mail](https://badges.weareopensource.me/badge/Contact-By%20Mail-3498db.svg?style=flat-square)](mailto:weareopensource.me@gmail.com?subject=Contact)

# [WeAreOpenSource](https://weareopensource.me) Angular

## Presentation

This project is a stack Angular that can be ran as a standalone frontend. Or in a fullstack with another of our repo of your choice (ex: [Node](https://github.com/weareopensource/Node)). 

You can have more informations about : 

* our mindset and what we would like to create in our [introduction](https://weareopensource.me/introduction/) (in construction)
* how to create a fullstack from our repo in our [wiki](https://github.com/weareopensource/weareopensource.github.io/wiki) (in construciton).
* our global roadmap and propose ideas about stacks in our [board](https://github.com/weareopensource/weareopensource.github.io/projects/1)
* how to contribute and help us [here](https://github.com/weareopensource/weareopensource.github.io/blob/master/CONTRIBUTE.md)

Our stack Angular is actually in Beta and was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.8.

# Angular Cli / RxJS / Material / Jwt

## Technology Overview

| Subject | Informations
| ------- | --------
| **in development** | 
| in development  | ....
| **Being released** | 
| in development  | ....
| **In reflexion** | 
| in development  | ....

## Features Overview

#### Available

* **User** : classic register / auth or oAuth(microsoft, google) - profile management (update, avatar upload ...)
* **Admin** : list users - edit user - delete user
* **Tasks** : list tasks - add tasks - edit tasks - delete tasks

#### In reflexion

RGPD conpliance 

## [Demo](http://meanie.weareopensource.me)  
(This Angular stack is used for this demonstration with our [Node](https://github.com/weareopensource/Node) Stack)

## Prerequisites
Make sure you have installed all of the following prerequisites on your development machine:

* Git - [Download & Install Git](https://git-scm.com/downloads)
* Node.js (10.x) - [Download & Install Node.js](https://nodejs.org/en/download/)
* Angular cli - npm install -g @angular/cli

## Installation
It's straightforward (you can use yarn if you want)

```bash
$ git clone https://github.com/weareopensource/angular.git && cd Angular
$ npm i 
```

## Running Your Application

### Development

* Run `npm start` for a dev server. Available at `http://localhost:4200/`.

### Production

* Run `npm run build:prod` to build your client App

### others 

* Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
* test : `ng test`
* test e2e : `npm e2e `

### Configuration
This process take into account all system environment variables defined under the form WAOS_FRONT_<path_toVariable>. A pre-build npm script turns under the hood those system environment variables into an object, infering paths from the varialbles name, merged to the environment object defined on environment.prod.ts to regenerate that file, regardless of the production or developement mode.

All configuration avalable on environment.ts file are overidable. You can for instance define the API server coordonates by defining those system environment variables:

-  WAOS_FRONT_api_host='my-server'
-  WAOS_FRONT_api_port=4000
-  WAOS_FRONT_api_endPoints_basePath='api2'


## [Contribute](https://github.com/weareopensource/weareopensource.github.io/blob/master/CONTRIBUTE.md)

## History

This work is based on [MEAN.js](http://meanjs.org) and more precisely on a fork of the developers named [Riess.js](https://github.com/lirantal/Riess.js). The work being stopped we wished to take it back, we want to create updated stack with same mindset "simple", "easy to use". The toolbox needed to start projects, but not only with Node and Angular ...

## [We Are Open Source, Who we are ?](https://weareopensource.me)
Today, we dreams to create Backs/Fronts, aligns on feats, in multiple languages, in order to allow anyone to compose fullstack on demand (React, Angular, VusJS, Node, Nest, Swift, Go).
Feel free to discuss, share other kind of bricks, and invite whoever you want with this mindset to come help us.

## Licence

[![Packagist](https://badges.weareopensource.me/packagist/l/doctrine/orm.svg?style=flat-square)](/LICENSE.md)

## Main Team

#### Pierre 
[![Help](https://badges.weareopensource.me/badge/Help-On%20Patreon-052d49.svg?style=flat-square)](https://www.patreon.com/pbrisorgueil) [![Cofee](https://badges.weareopensource.me/badge/Buy-Me%20a%20Coffee-FF813F.svg?style=flat-square)](https://www.buymeacoffee.com/JrSa9tZGO) [![Github](https://badges.weareopensource.me/badge/Follow-me%20on%20Github-25292E.svg?style=flat-square)](https://github.com/PierreBrisorgueil) [![Twitter](https://badges.weareopensource.me/badge/Follow-me%20on%20Twitter-3498db.svg?style=flat-square)](https://twitter.com/pbrisorgueil?lang=fr)  [![Youtube](https://badges.weareopensource.me/badge/Watch-me%20on%20Youtube-e74c3c.svg?style=flat-square)](https://www.youtube.com/channel/UCIIjHtrZL5-rFFupn7c3OtA)

#### techla 
[![Github](https://badges.weareopensource.me/badge/Follow-me%20on%20Github-25292E.svg?style=flat-square)](https://github.com/techla)

Feel free to come help us ! :) 

