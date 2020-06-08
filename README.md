<p align="center"><img src="https://4.bp.blogspot.com/-FI8LE3KC1H8/WDvw2uR0rKI/AAAAAAAAAMw/YDI8HnCXIB0kAED48pTMrjJh3sSZksTbgCLcB/s1600/Project%2BManagement%2B-%2Bfreewallpaperimage.xyz%2B.jpg"></p>

<h1 align="center">Task Manager REST API</h1>

<p align="center">
<a href=""><img src="https://img.shields.io/circleci/project/github/r-spacex/SpaceX-API/master.svg?style=flat-square"></a>
<a href=""><img src="https://img.shields.io/badge/interface-REST-brightgreen.svg?longCache=true&style=flat-square"></a>
</p>

<h3 align="center">Open Source REST API for managing automated tasks</h3>

The task manager is a Postman collection that manages automation task for users e.g Using AI to automatically turn on home heater by a certain time or book a resturant table at a certain with no added work from client. V1 can curently manage normal tasks that requires no automation e.g Call grandma by 5pm.
You can run colection in postman. Confirm environment is set to `Task Manager API(prod)`. To run locally clone git repository.

## Base URL

`https://somtoo-task-manager-apiv1.herokuapp.com/`

## Authentication

Authentication via client JSON_WEB_TOKEN is required for all destructive routes. This includes all `create`, `update`, and `delete` routes.

Authenticate locally on post man by adding a test script in Create User and Login User POST routes

```javascript
if (pm.response.code === 201) {
    pm.environment.set('authToken', pm.response.json().token)
}
```


## Pagination + Querying

All `/task` routes support pagination parameters via [mongoose-paginate](https://github.com/aravindnc/mongoose-paginate-v2).

By default `/task?completed=true`


`options` currently implemented:  

  - `sort` { Object | String } - Sort order. [Documentation](http://mongoosejs.com/docs/api.html#query_Query-sort)
  - `skip` { Number } - Use `skip` to set skip task position
  - `page` { Number }
  - `limit` { Number }


This is the default return structure:
```json
[
    {
        "completed": true,
        "_id": "5ecc85e3bb278300177bc6b1",
        "description": "Clean toilet nd bathroom",
        "owner": "5ecc85d5bb278300177bc6af",
        "createdAt": "2020-05-26T02:58:43.964Z",
        "updatedAt": "2020-05-26T02:58:43.964Z",
        "__v": 0
    }
]
```
Another Query Example:
 
    /tasks?sortBy=createdAt:desc

## Error codes
This API uses standard [HTTP STATUS CODES](https://httpstatuses.com/)

## Routes
Visit  [Task_Manager_api_v1](https://documenter.getpostman.com/view/4362857/SztK35Rc?version=latest) for full route documentation


## Built with
<p>
<img src="https://i.morioh.com/8c8203b86e.png" width="200" height="150" alt="Computer Hope">
</p>
<p><img src="https://img.icons8.com/color/144/000000/nodejs.png"/></p>
<p><img src="https://img.icons8.com/color/144/000000/mongodb.png"/></p>




## FAQ's
* If you have any questions or corrections, please open an issue and we'll get it merged ASAP
* For any other questions or concerns, just shoot me an email `chukwurahb@gmail.com`
