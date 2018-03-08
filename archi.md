# WAOS Angular - Architectural point of vue

# Introduction
From an architecture perspective, the Angular kick starter relies on a store based architecture, as known as the Flux architecture, provided by ngrx that enforces reactive functional programming for treating the dataflow. The rendering mecanism of Angular follows the unidirectional dataflow, witch is actually a prerequisite to Flux.
The goal of this architecture is to provide a fix complexity scalable solution for managing shared datas between components. It's based under the hood on the legacy eventEmitter pattern, slightly modified.
Event-driven acrhitecture is familiar concept for sever side programmers. It's even implemented deep into the DOM through the window global bus event, making event delegation mecanisme a solution close to the store pattern. The Flux architecture generalize that idea for sharing and managing global datas through a whole application.

# ngrx
Several libraries are providing a store solution for Angular, but [ngrx](https://github.com/ngrx/platform) is by far the one that is the closest to it. It's build upon rxjs that is a fondamental peace of Angular.

# Angular Material
Angular material is a UI librairy that implements the [material design specifications](https://material.io/). It provides clean and well designed graphical components that are natively build with angular, and a customable global theme that custom components can benefit from.

# nx
nx is build on top of the angular-cli. It proposes a new scaffolding to make library oriented development, by redefining the cli schematics and adds additional generators mainly to handle store modules. Almost all the code base resides onto libraries that are essentialy modules, even if they are not intended to be shared.
On the other hand, it provides some internal libraries to handle properly API race conditions. It introduces itself as a toolkit helper to create and build enterprise-grade Angular applications.

# Angular modules

## Introduction
What makes a framework powerfull is its hability to decompose a program onto serveral pieces of code that can be exported and imported. And this notion of modularity is a must for large applications.
The module system of Angular bundles the building blocks of Angular (said directives, components, pipes and services) for a specific purpose or feature.

## Recommandations and guide line

## General aspects
For the sack of clarity and best practice, we recommand developers to design their features as modular as possible, and for each of them, define 3 modules:
* One main module that provides directives, components, containers, pipes, ie all pieces that are related to the view itself
* One store module to expose and handle the datas handled by the feature
* One last module to manage routing, if required
This module subdivision could be logical or physical: All the code related to a feature can be merged into a uniq folder or spread into 3 folders.

## Dependencies
The dependencies between those 3 modules should be defined this way:
The routing module depends to the view module witch depends to the store module.

## Lazyloading
The routing module should be lazyloaded by the core routing module.
Ps: Sometimes, we need the store module of a feature to be loaded at the bootstrap of the application (even if its related module was not yet lazyloaded). In that case, we simply load it synchronously from the app module.

We follow ourself those recommandations for build our starter. For instance, the kick starter has to manage several features:
* The authentication mechanism
* A main layout for the application
* A Task Entity 

For each of those feature, we need to define 3 modules (at least 2). You can find them on the libs directory.
