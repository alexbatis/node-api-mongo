# NodeJS API

REST API built with NodeJS, Express, MongoDB, Mongoose, & Yeoman Generator

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

#### NodeJS & NPM
[Download](https://nodejs.org/en/download/) and install NodeJS (also installs [NPM](https://www.npmjs.com/)) 

#### MongoDB
[Download](https://github.com/user/repo/blob/branch/other_file.md) and install MongoDB
* Add C:\Program Files\MongoDB\Server\{version}\bin environment variable to path
* Create C:\data\db empty folder to house data

### Yeoman & Restgoose Generator
* Install Yeoman Generator

```
$ npm install -g yo
```

* Install Restgoose Generator

```
$ npm install -g generator-restgoose
```

## Install & Run

Run the restgoose generator to create a scaffolded project

```
$ yo restgoose
```

Run the app

```
$ grunt server
```

## Create & Delete Schemas
Create a schema using the restgoose generator

```
$ yo restgoose:schema "article|title:String,excerpt:String,content:String,published:Boolean,created:Date"
```

Delete a schema using the restgoose generator:

```
$ yo restgoose:deleteschema "article" --force
```

## Todo List
The example on this repository provides GET/PUT/POST/DELETE functionality for a simple todoList.

[TodoList Docs](docs/todo.md)

## Authors
**Alex Batis**  | [GitHub](https://github.com/alexbatis) | [LinkedIn](https://www.linkedin.com/in/alexander-batis-3a202b101/)

## License

This project is licensed under the [MIT License](https://en.wikipedia.org/wiki/MIT_License).

