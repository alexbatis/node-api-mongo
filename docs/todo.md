## Todo
  `Todo` Endpoint for managaing todos.

### Endpoint Summary
* `[GET]` /api/todos - [Retrieve All *Todos*](#Retrieve-All-Todos)
* `[POST]` /api/todo - [Create a new *Todo*](#Create-a-new-Todo)
* `[GET]` /api/todo/<.id> - [Retrieve a single *Todo* with `id`](#Retrieve-a-single-Todo)
* `[PUT]` /api/todo/<.id> - [Edit a single *Todo* with `id`](#Edit-a-single-Todo)
* `[DELETE]` /api/todo/<.id> - [Delete a single *Todo* with `id`](#Delete-a-single-Todo)
* `[GET]` /api/todos/test - [Quick Test todo](#Quick-Test-todo)
* `[DELETE]` /api/todos - [Delete all *todos* in the collection](#Delete-all-todos)
* `[GET]` /api/todos/search - [Searches all *todos* for multiple values](#Search-todos)


**N.B**: The `/test` endpoint of this todo is for quick development testing only. Do Disable this when in production!


### Retrieve All Todos

* **Syntax** : `[GET] /api/todos [?skip= X & limit= Y]` 
* **URL** :  `/api/todos`  
* **Method**: `GET`  
* **URL Params**:   
   **Required:**   None  
   **Optional:**
 
   `skip=[Integer]` - Offsets(Skips) index of results  
   `limit=[Integer]` - Total number of results in the current request to return
* **Success Response:**
 
   **Code:** 200 <br />
    **Content:** 
    ```
    {
      "status": "success",
      "data": {
        "todos": [
          {
            "_id": "587100001657a2bd9c5a00df",
            title : String,
			 description : String,
			 completed : Boolean,
			 created : Date,
            "__v": 0
          },
          .
          .
          .
        ],
        "count": 1
      },
      "message": null
    }
    ```

* **Sample Call:**

   `  curl "http://localhost:3000/api/todos"`  
 Fetches 5 todo results skipping the first 2  

* **Notes:**

 
### Create a new Todo 

* **Syntax** : `[POST] /api/todo`
* **URL** :  `/api/todo`  
* **Method**: `POST`  
* **URL Params**:   
   **Optional:**   None  
   **Required:**  
 
   `{todo:{}}` - The base todo data object  
   ```
    { 
      "todo" : {
        title : String, 
        description : String, 
        completed : Boolean, 
        created : Date
         
      }
    }
   ```
* **Success Response:**
 
   **Code:** 201  
   **Content:** 
    ```
      {
        "status": "success",
        "data": {
          "__v": 0,
          "_id": "58713aaf1657a2bd9c5a00e0",
          title : String, 
          description : String, 
          completed : Boolean, 
          created : Date
           
        },
        "message": null
      }
    ```
* **Error Response:**
 
   **Code:** 500 <br />
    **Content:** 
    ```
      {
        "status": "error",
        "data": "Invalid todo/key model provided",
        "message": "There was an error saving this data."
      }
    ```
* **Sample Call:**

  ``` 
      curl -X POST -H "Content-Type: application/json" 
        -H "Cache-Control: no-cache" -d     '{
        "todo":{
            "name":"pen",
            "price":2.54
            }
        }' "http://localhost:3000/api/todo"
    
    ```
  The key model being `todo` the saves a 'pen' data 

* **Notes:**




### Retrieve a single Todo 

* **Syntax** : `[GET] /api/todo/:id`
* **URL** :  `/api/todo/:id`  
* **Method**: `GET`  
* **URL Params**:   
   **Optional:**   None  
   **Required:**  
 
   `id` - The object id of the todo  
   
* **Success Response:**
 
   **Code:** 200  
   **Content:** 
    ```
      {
        "status": "success",
        "data": {
          "_id": "587100001657a2bd9c5a00df",
          "__v": 0,
          title : String, 
          description : String, 
          completed : Boolean, 
          created : Date
           
        },
        "message": null
      }
    ```
* **Error Response:**
 
   **Code:** 404   
   **Content:** 
    ```
      {
        "status": "error",
        "data": 404,
        "message": "Not Found Error"
      }
    ```
* **Sample Call:**

  ``` 
      curl -X GET -H "Content-Type: application/json" 
        -H "Cache-Control: no-cache" 
        "http://localhost:3000/api/todo/587100001657a2bd9c5a00d"
    
    ```
  Fetches a single todo from the collection `todos`

* **Notes:**




### Edit a single Todo

* **Syntax** : `[PUT] /api/todo/:id`
* **URL** :  `/api/todo/:id`  
* **Method**: `PUT`  
* **URL Params**:   
   **Optional:**   None  
   **Required:**  
 
  `id` - The object id of the todo  
    `{todo:{}}` - The base todo data object that needs to be changed 
   ```
    { 
      "todo" : {
        title : String, 
        description : String, 
        completed : Boolean, 
        created : Date
         
      }
    }
   ```
* **Success Response:**
 
   **Code:** 202  
    **Content:** 
    ```
      {
        "status": "success",
        "data": {
          "_id": "587100001657a2bd9c5a00df",
          "__v": 0,
          title : String, 
          description : String, 
          completed : Boolean, 
          created : Date
           
        },
        "message": null
      }
    ```
* **Error Response:**
 
   **Code:** 500  
   **Content:** 
    ```
      {
        "status": "error",
        "data": "Invalid todo/key model provided",
        "message": "There was an error updating this data."
      }
    ```
    
   **Code:** 404  
   **Content:** 
    ```
    {
      "status": "error",
      "data": 404,
      "message": "No Data Found"
    }
    ```
* **Sample Call:**

  ``` 
      curl -X PUT -H "Content-Type: application/json" 
        -H "Cache-Control: no-cache" 
        -d '{
              "todo22":{
                  "name":"sharpner",
                  "price":2.55
                }
            }' "http://localhost:3000/api/todo/587100001657a2bd9c5a00df"
    
    ```
  The key model being `todo` which updates a 'sharpner' data 

* **Notes:**








### Delete a single Todo

* **Syntax** : `[DELETE] /api/todo/:id`
* **URL** :  `/api/todo/:id`  
* **Method**: `DELETE`  
* **URL Params**:   
   **Optional:**   None  
   **Required:**  
 
  `id` - The object id of the todo  
* **Success Response:**
 
   **Code:** 202  
    **Content:** 
    ```
    {
      "status": "success",
      "data": "The todo got Deleted",
      "message": null
    }
    ```
* **Error Response:**
 
   **Code:** 500  
   **Content:** 
    ```
      {
      "status": "error",
      "data": "Error in deleting this todo",
      "message": {
        .
        .
        .
      }
    }
    ```
    
* **Sample Call:**

  ``` 
    curl -X DELETE "http://localhost:3000/api/todo/58713b0a1657a2bd9c5ad"
    ```
  The key model being `todo` which updates a 'sharpner' data 

* **Notes:**





### Delete all Todos

* **Syntax** : `[DELETE] /api/todos`
* **URL** :  `/api/todos`  
* **Method**: `DELETE`  
* **URL Params**:   
   **Optional:**   None  
   **Required:**  None 
* **Success Response:**
 
   **Code:** 202  
   **Content:** 
   ```
    {
      "status": "success",
      "data": "All todos got Delete",
      "message": null
    }
   ```
* **Error Response:**
 
   **Code:** 500  
   **Content:** 
   ```
      {
        "status": "error",
        "data": "Error in deleting all todos",
        "message": {
          .
          .
          .
        }
      }
    ```
    
* **Sample Call:**

  ``` 
    curl -X DELETE "http://localhost:3000/api/todos"
    ```
  The key model being `todo` which updates a 'sharpner' data 

* **Notes:**




### Search Todos

* **Syntax** : `[GET] /api/todos/search [?skip= X & limit= Y & keyword= field:value [,field:value]]` 
* **URL** :  `/api/todos/search`  
* **Method**: `GET`  
* **URL Params**:   
   **Required:**   keyword  
   **Optional:**
 
   `skip=[Integer]` - Offsets(Skips) index of results  
   `limit=[Integer]` - Total number of results in the current request to return
   `keyword=[CSV]` - keyword = field1:value1, filed2:value2 ... 
    `strict=[Boolean]` - Performs Strict search.

* **Success Response:**
 
   **Code:** 200 <br />
    **Content:** 
    ```
    {
      "status": "success",
      "data": {
        "todos": [
          {
            "_id": "587100001657a2bd9c5a00df",
            name : String,
        price : Number,
            "__v": 0
          },
          .
          .
          .
        ],
        "count": 1
      },
      "message": null
    }
    ```

* **Sample Call:**

   `  curl "http://localhost:3000/api/todos/search?keyword=first:Sam,last:Jones"`  
 Searches todos with rows with its first name 'Sam' and last name 'Jones'

* **Notes:**
To use Strict Search, add param ?strict=true