# skyrealm-question

the answer for some [Backend Coding Question]

## useage

### prepare

1. make sure you have installed "nodejs". β οΈnode version : v18.13.0
2. make sure you have installed "yarn": `npm install yarn -g` to install it.
3. cd this project path, and command `yarn install` to install node modules.

### run command

* `npm run dev` to launch the program, and link to http://localhost:3000/graphqlApi to open the ui and validation some api.
* `npm run initdb` to initialization or reinitialize some mocked data.
* `npm run test` to run mocha test. (It's not done π)

### interface
  Open http://localhost:3000/graphqlApi in the browser.
  Or POST http://localhost:3000/graphqlApi.


## project tree

```
.
βββ db           -- dbutil
βββ graphql      -- definition graphql structure
βββ mock_data    -- mock some data
βββ services     -- processing service
βββ toolkit      -- dbinit util
βββ utils        -- some common util
```

## some prepared query

some time, users must log in first. like adding favorites.

login as default user:

```
mutation {
  loginDefault
}

# and response
# {
#   "data": {
#     "loginDefault": true
#   }
# }
```

logout:
```
mutation {
  logout
}

# and rsponse
# {
#   "data": {
#     "logout": true
#   }
# }
```

query pins of map

warnβ οΈ: if you want to get "haveCollected", you must login first.
```
query{
  storeList(lng:20, lat: 20, radius: 10) {
    id
    name
    address
    pictures
    lng
    lat
    visitor
    frequency
    mediumIncome
    haveCollected
  }
}

# and response
# {
#   "data": {
#     "storeList": [
#       {
#         "id": "No.1",
#         "name": "my home",
#         "address": " my address",
#         "pictures": [
#           "http://image1.jgp"
#         ],
#         "lng": 20,
#         "lat": 20,
#         "visitor": 3,
#         "frequency": 10,
#         "mediumIncome": 30,
#         "haveCollected": false
#       }
#     ]
#   }
# }
```

query store page

```
query{
  storePageList(
    lng: 20
    lat: 20
    radius: 30
    pageNum: 1
    pageSize: 2
    
  ) {
    total
    pageNum
    pageSize
    list {
      id
      name
      address
      pictures
      lng
      lat
      visitor
      frequency
      mediumIncome
      haveCollected
    }
  }
}

# and response
# {
#   "data": {
#     "storePageList": {
#       "total": 3,
#       "pageNum": 1,
#       "pageSize": 2,
#       "list": [
#         {
#           "id": "No.3",
#           "name": "her home",
#           "address": " her address",
#           "pictures": [
#             "http://image3.jgp"
#           ],
#           "lng": 8,
#           "lat": 8,
#           "visitor": 3,
#           "frequency": 10,
#           "mediumIncome": 10,
#           "haveCollected": false
#         },
#         {
#           "id": "No.2",
#           "name": "your home",
#           "address": " your address",
#           "pictures": [
#             "http://image2.jgp"
#           ],
#           "lng": 10,
#           "lat": 10,
#           "visitor": 4,
#           "frequency": 20,
#           "mediumIncome": 40,
#           "haveCollected": false
#         }
#       ]
#     }
#   }
# }
```

addFavorite
```
mutation{
  addFavorite(storeId: "No.1")
}
# and response
# {
#   "data": {
#     "addFavorite": "Vb4l9u5dRdbStwBy"
#   }
# }
```

unfavorite
```
mutation{
  unfavorite(storeId: "No.1")
}

# and response
# {
#   "data": {
#     "unfavorite": true
#   }
# }
```