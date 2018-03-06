# WAOS Angular - Architectural point of vue

# Introduction
From an architecture perspective, the Angular kick starter relies a store based architecture, as known as the Flux architecture, provided by ngrx that enforces reactive functional programming for treating the dataflow. The rendering mecanism of Angular follows the unidirectional dataflow, witch is actually a prerequisite to Flux.
The goal of this architecture is to provide a fix complexity scalable solution for managing shared datas between components. It's based under the hood on the legacy eventEmitter pattern, slightly modified.
Event-driven acrhitecture is familiar concept for sever side programming developpers. It's even implemented deep into the DOM through the window global bus event, making event delegation mecanisme a solution close to the store pattern. The flux architecture generalize that idea for sharing and managing global datas through a whole application.

# ngrx
Several libraries are providing a store solution for angular, but [ngrx](https://github.com/ngrx/platform) is by far the one that is the closest to Angular. It's build upon rxjs that is a fondamental peace of Angular.

# Angular Material
Angular material is a UI librairy that implements the [material design specifications](https://material.io/). It provides clean and well designed graphical components that are natively build with angular, and a customable global theme that custom components can benefit from.

# nx
nx is build on top of the angular-cli. It proposes a new scaffolding to make the developpement library oriented, by redefining the cli schematics and adds additional generators mainly to handle store modules. Almost all the code base resides onto library that are essentialy modules, even if they are not intended to be shared.
On the other hand, it provides some internal libraries to handle properly API race conditions. It introduces itself as toolkit helper to create and build enterprise-grade Angular application.

# Angular modules
What makes a framework powerfull is its hability to decompose a program onto serveral pieces of code that can be exported and imported. And this notion of modularity is a must for large applications.
The module system of Angular bundles the building blocks of Angular (said directives, components, pipes and services) for a specific purpose or feature.

The kick starter has to manage several things:
* An authentication mechanism
* A Main layout
* A Task Entity 

For the sack of clarity and best practice, the kick starter war designed as modular as possible, and for each of those feature, at least one module is required.

Generaly speaking, we recommand developpers to have 3 modules by feature.
* One main module that provides directives, components, containers, pipes, ie all pieces that are related to the view itself
* One store module to expose and handle the data state handled by the feature
* One last module to manage routing, if required

# Authentication
