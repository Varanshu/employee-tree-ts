# Employee Organization Management Application
This repository contains an Employee Organization Management Application, written in TypeScript, that allows you to manage an organizational hierarchy of employees. The application provides features to move employees between supervisors, undo and redo operations, and maintains a history of organizational changes.

## Table of Contents
* Introduction
* Features
* Getting Started
* Usage
* Methods
* Undo and Redo

## Introduction
This Employee Organization Management Application is a task provided to me by **Manfac Analytics** for the position of **Front End Developer**. It is designed to help you manage the organization tree of employees within an organization. This application represents employees as objects, where each employee can have subordinates reporting to them. The parent object this object represents the Chief Executive Officer (CEO).

## Features
* Move an employee to a different supervisor within the organization.
* Maintain a history of organizational changes for undo and redo operations.
* Undo and redo organizational changes to restore previous organisational states.

## Getting Started

### Installation

1. To get started with the Employee Organization Management Application, follow these steps:

    ```bash
        git clone https://github.com/Varanshu/employee-tree-ts.git
    ```

1. Navigate to the project directories

    ```bash
        cd employee-org-app
    ```

1. Install the necessary dependencies using npm or yarn.

    ```bash
        npm install
    ```

### Build
1. Compile the TypeScript code to JavaScript

    ```bash
        npm run build
    ```

### Start
1. Run the compiled JavaScript code using Node.js.

    ```bash
        node dist/index.ts
    ```

## Usage
To use the Employee Organization Management Application, follow the examples provided in the *index.ts* file. The code in *index.ts* how to create an instance of the **IEmployeeOrgApp** class, perform employee moves, and utilize *undo* and *redo* functionalities.

## Methods
The **IEmployeeOrgApp** class provides the following methods:

* *move(employeeID: number, supervisorID: number): void* - Moves an employee with the specified employeeID to report to the supervisor with the specified supervisorID.

* *undo(): void* - Reverts the organization to the previous state before the last operation.

* *redo(): void* - Reapplies the previously undone operation.

## Undo and Redo
The Employee Organization Management Application maintains a history of organizational changes, enabling you to undo and redo operations. The history is managed through the *history* array, and the current state index is tracked using the *currentIndex* property. You can use the *undo()* and *redo()* methods to navigate through the history and restore previous states of the organization.

