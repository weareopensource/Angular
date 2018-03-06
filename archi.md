# WAOS Angular - Architectural point of vue

# Introduction
From an architecture perspective, the Angular kick starter relies a store based architecture, even known as Flux architecture, provided by ngrx that enforces reactive functional programming for treating the dataflow. The rendering mecanism of Angular follows the unidirectional dataflow, witch is actually a prerequisite to Flux.
The goal of this architecture is to provide a fix complexity scalable solution for managing shared datas between components. It's based under the hood on the legacy eventEmitter pattern, slightly modified.
Event-driven acrhitecture is an old concept for those comming from a sever programming background. It's even implemented deep into the DOM through the window global bus event, making event delegation mecanisme a solution close to the store pattern. The flux architecture generalize that idea for sharing and managing global datas through a whole application.

# ngrx
Several libraries are providing a store solution for angular, but [ngrx](https://github.com/ngrx/platform) is by far the one that is the closest to Angular. It's build upon rxjs that is a fondamental peace of Angular.

# Angular Material
Angular material is a UI librairy that implements the [material design specifications](https://material.io/). It provides clean and well designed graphical components that are natively build with angular, and a customable global theme that custom components can benefit from.
