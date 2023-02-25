
# EzParking service
##  basic information


### 1.1 protocol
* https

### 1.2 Request method
* Most of the methods are get methods, but some are post methods

### 1.3 Character Encodings
* The HTTP communication and the message base64 encoding are encoded in the utf-8 character set.

### 1.4 Public parameter Description:

|  Name   | Description  | Remarks  |
|  ----  | ----  | ---- |
| Public parameters  | Each interface contains generic parameters, stored in JSON format in the Header property |See the following public parameter description for details |
| Private parameters  | The parameters specific to each interface are stored in JSON format in the Body property |See each interface definition for details |


* Public parameter Description:

|  Name   | type |description  |
|  ----  | ----  |----  |
| Token  |  string|token if the user is logged in, an empty string if not |
| Id  | String |Id of each user |
| Name  | String |id of each waypoint |

## 2.Interface definition：
### 2.1 login API
* method:POST
* API introduce : login
* API address: /login
### 2.1.1 required parameter

|  parameter   | type  |description  |
|  ----  | ----  |----  |
| Name  | String |username of the account |
| passwrod  | String |passwrod of the account |

* Example request:
{"name":"21",
"password":"21"}
### 2.1.2 Returning the results
|  parameter   | type  |description  |
|  ----  | ----  |----  |
| code  | String | Response code |
| Msg  | String ||
| Data  | object	 ||

* Example:
 {
    "code": 200,
    "data": {
        "token": "eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI2MjA4YTgwZDIxZWY0NzNhOWRmZjM3Y2JjYjAzOWRlNCIsInN1YiI6IjExIiwiaXNzIjoienciLCJpYXQiOjE2NzcwNjkyMTgsImV4cCI6MTY3NzA4MzYxOH0.p-5qzIGaxzUQlhanNW3zZV-w-n0ou19eko3JFEmm7UA",
        "userInfo": {
            "email": "kev123@uregina.ca",
            "id": "11",
            "name": "21"
        }
    },
    "msg": "success"
}

### 2.2 insert API
* method:Request
* API introduce : insert waypoiny
* API address: /insertWP
### 2.2.1 required parameter

|  parameter   | type  |description  |
|  ----  | ----  |----  |
| Name  | String |id of the waypoint |
| LAT  | double |latitude |
| LNG  | double |longitude |

* Example request:
[{"3":{"lat":50.41915543002663,"lng":-104.59152547854696,"type":"Destination(Destination Name: cl)","neighbor":[0,2]},"5":{"lat":50.41815427644465,"lng":-104.58999337158725,"type":"Way point","neighbor":[2,1,0]}}] 
### 2.2.2 Returning the results
|  parameter   | type  |description  |
|  ----  | ----  |----  |
| code  | String | Response code |
| Msg  | String ||
* Example:
 {
    "code": 400,
    "msg": "way point is empty."
}
### 2.3 load API
* method:Request
* API introduce : load waypoiny
* API address: /loadWP

### 2.3.1 Returning the results
|  parameter   | type  |description  |
|  ----  | ----  |----  |
| code  | String | Response code |
| Msg  | String ||
| Data  | object	 ||
| lat  | String	 | latitude|
| lng  | String	 |longitude|
| name  | String	 | id of the waypoint|
| neighbor  | String	 | children node of the current node|
| type  | String	 | type of the node|

* Example:
 {
            "lat": 50.418012539679950000000000000000,
            "lng": -104.591226996203370000000000000000,
            "name": "43",
            "neighbor": "[11,38,44]",
            "type": "Way point"
        }

  ### 2.4 update waypoint API
  * method:Request
* API introduce : update waypoiny
* API address: /updateWP

### 2.4.1 required parameter

|  parameter   | type  |description  |
|  ----  | ----  |----  |
| Name  | String |id of the node |
| lat  | String |latitude |
| lng  | String |longitude |
| neighbor  | String |children node of the point |
| type  | String |type of  the   node|
* Example Request:
 {
            "lat": 50.418012539679950000000000000000,
            "lng": -104.591226996203370000000000000000,
            "name": "43",
            "neighbor": "[11,38,44]",
            "type": "Way point"
        }

 ### 2.4.2 Returning the results
 Example: {
    "code": 200,
    "msg": "ok."
}

### 2.5 add count API
* method:Request
* API introduce : Increase the number of cars in the parking lot
* API address: /countUp

|  parameter   | type  |description  |
|  ----  | ----  |----  |
| parkingLot  | String |id of the parkingLot |

### 2.5.1 Returning the results
|  parameter   | type  |description  |
|  ----  | ----  |----  |
| code  | String | Response code |
| Msg  | String ||

Example:{
    "code": 200,
    "msg": "ok"
}

### 2.6 decline count API
* method:Request
* API introduce : Increase the number of cars in the parking lot
* API address: /countDown

|  parameter   | type  |description  |
|  ----  | ----  |----  |
| parkingLot  | String |id of the parkingLot |

### 2.6.1 Returning the results
|  parameter   | type  |description  |
|  ----  | ----  |----  |
| code  | String | Response code |
| Msg  | String |

Example:{
    "code": 200,
    "msg": "ok"
}
### 2.7 query amount API
* method:Request
* API introduce : Check the number of cars in the parking lot
* API address: /queryCount


### 2.7.1 Returning the results
|  parameter   | type  |description  |
|  ----  | ----  |----  |
| code  | String | Response code |
| Msg  | String ||
|data|object||

Example:{
    "code": 200,
    "data": 331,
    "msg": "success"
}

### 2.8 delete waypoint API
* method:Request
* API introduce : delete way point
* API address: /deleteWp

|  parameter   | type  |description  |
|  ----  | ----  |----  |
| name  | String |id of the node  |
 {
           
            "name": "43"
           
        }

### 2.8.1 Returning the results
|  parameter   | type  |description  |
|  ----  | ----  |----  |
| code  | String | Response code |
| Msg  | String ||

Example:{
    "code": 200,
    "msg": "ok"
}


### 2.9 updateDNwp waypoint API
* method:Request
* API introduce : updateDNwp information about waypoint
* API address: /updateDNwp

|  parameter   | type  |description  |
|  ----  | ----  |----  |
| id  | String |id of the node  |
| name  | String |name of the parking lot |


 {
            "id": 12,
            "name": "CW",
            
        }

### 2.9.1 Returning the results
|  parameter   | type  |description  |
|  ----  | ----  |----  |
| code  | String | Response code |
| Msg  | String ||

Example:{
    "code": 200,
    "msg": "ok"
}

### 2.10 updatePLwp  API
* method:Request
* API introduce : update of the parkingLot
* API address: /updatePLwp

|  parameter   | type  |description  |
|  ----  | ----  |----  |
| id  | String |id of the node  |
| name  | String |name of the parking lot |
| amount  | int |The total number of Spaces in a parking lot  |

 {
            "id": 12,
            "amount": 12222,
            "name": "CW",
            
        }

### 2.10.1 Returning the results
|  parameter   | type  |description  |
|  ----  | ----  |----  |
| code  | String | Response code |
| Msg  | String ||

Example:{
    "code": 200,
    "msg": "ok"
}
