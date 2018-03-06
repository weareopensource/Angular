# WAOS Angular - Architectural point of vue

# Introduction
From an architecture perspective, the Angular kick starter relies a store based architecture, even known as flux architecture, provided by ngrx that enforces reactive functional programming for treating the dataflow. The rendering mecanism of Angular follows the unidirectional dataflow, witch is actually a prerequisite to flux.
The goal of this architecture is to provide a fix complexity scalable solution for managing shared datas between components. It's based under the hood on the legacy eventEmitter pattern, slightly modified.
Event-driven acrhitecture is an old concept for those comming from a sever programming background. It's even implemented deep into the DOM through the window global bus event, making event delegation mecanisme a solution close to the store pattern. The flux architecture generalize that idea for sharing and managing global datas through a whole application.

# ngrx
Several libraries providing a store solution for angular exists, but ngrx is by far the one that is the closest to the Angular. It's build upon rxjs that is a fondamental peace of Angular.
