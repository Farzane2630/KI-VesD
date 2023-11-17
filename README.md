
 ## Project's Title
 KI-VesD

## Project Description
 A tabular representation of the employee's annual and monthly salary

This application has been developed to help admin to manage tabluar data and have control over themin and costomization work-flow.

## stacks
reactjs
Typescript
Sass
jest
react-testing-liberary
The environment has been set using **Vi[](https://vitejs.dev/)te**. And as routing I have made the use of **react-router-dom** package.

## Table of Contents
1. instalation, run and test 
2. folder structure
3. git commit orders


## Instalation, Run, Deploy and Test

**Install** --> `pnpm i`

**Run** --> `pnpm run dev` or `pnpm dev`

**Test** --> `pnpm run test` or `pnpm test`

## Folder Structure

**src/Components:** contains Components of this project.

custom components are into _src/Components/CustomComponent_ ,

**src/Layout:**

In this folder we have a MainLayout folder which contains the main layout for the panel (sidebar, main content and metadata). The other folder named meradata stores metadata`s footer and header of the MainLayout component. 

**src/pages:**

Per every menu-item we have a folder with a name as exact as the "menu item title".  

**src/styls:**

This folder contains all common and global styling files.

in **mixins.scss** 
commomn-used _styles_ are stored as global variables and are accessible in all .scss fils. 

in **variables.scss**
the most used _colors_ are stored as variables and are accessibe in all .scss files.

**src/Routes.tsx:**

Indicates all internal routes and navigation routes in this SPA application.


## Git Commit Orders
 
For commiting changes in project`s files I follow a rule and use some acronyms to indicate the type of changes:

**ref:**
as refactor.

**feat:**
as adding new freatures to the app.

**fix:**
as working on bugs and errors and fixing them.

**del:**
as removing a file, folder, feature or even a package and dependency.

**add:**
as installing new packages or dependencies.

**docs:**
as writing inline-comments or changing in README documents. 





