## Technologies

**Programming Language** : Node JS

**Database** : Mongo DB


## Data models

### Users (for authentication)
```JSON
{
    "id" : "jake",
    "email": "jake@jake.jake",
    "username": "jake",
    "fullName" : "jake jake",
    "image": "url",
    "phone": 12344,
    "createdAt" : "2016-02-18T03:22:56.637Z"
}
```
### Post
```JSON
{
    "id" : "12324",
    "body": "Good Morning",
    "userId": "jake1231",
    "likes" : 35,
    "createdAt" : "2016-02-18T03:22:56.637Z",
    "updatedAt" : "2016-02-18T03:22:56.637Z",
}
```
### Like
```JSON
{
    "postId"  : "12324",
    "userId" : "jake12312"
}
```

### Favorite
```JSON
{
    "postId"  : "12324",
    "userId" : "jake12312"
}
```

### Follow
```JSON
{
    "userId"  : "12324",
    "followedUserId" : "jake12312"
}
```

## Endpoints

### Authentication:

`POST /api/auth/login`

Example request body:
```JSON
{
    "email": "jake@jake.jake",
    "password": "jakejake"
}
```
Example request body:
```JSON
{
  "user": {
    "email": "jake@jake.jake",
    "token": "jwt.token.here",
    "username": "jake",
    "image": null
  }
}
```
### Registration
`POST /api/users`

Example request body:
```JSON
{
    "email": "jake@jake.jake",
    "username": "jake",
    "password": "jakejake",
    "fullName" : "jake jake"
}
```
Response Status: `200 OK`
### Create Post

`POST /api/posts`

*Authentication required*

Example request body:
```JSON
{
    "body": "Good Morning",
}
```
Response Status: `200 OK`

### Like Post

`PATCH /api/posts/:postId/like`

*Authentication required*

Response Status: `200 OK`

### Unlike Post

`PATCH /api/posts/:postId/unlike`

*Authentication required*

Response Status: `200 OK`

### Follow user
`PATCH /api/posts/:postId/follow`

*Authentication required*

Response Status: `200 OK`

### Unfollow user
`PATCH /api/posts/:postId/unfollow`

*Authentication required*

Response Status: `200 OK`

### Get Post
`GET /api/posts/:postId`

*Authentication required*

```JSON
{
    "id" : "unique id",
    "body": "Good Morning",
    "likes" : 35,
    "createdAt" : "2016-02-18T03:22:56.637Z",
    "updatedAt" : "2016-02-18T03:22:56.637Z",
    "user": {
        "id" : "jake",
        "username": "jake",
        "image" : "url",
        "fullName" : "jake jake"
    },
    "likedByViewer" : true,
    "favoritedByViewer" : true
}
```

### Feed
`GET /api/feed`

*Authentication required*

Returns most recent post globally by default

Example response body:
```JSON
{
    "data" : {
        "count" : 34342,
        "cursor" : "sdfadfasdfas",
        "posts" :  [
            {
                "id" : "unique id",
                "body": "Good Morning",
                "likes" : 35,
                "createdAt" : "2016-02-18T03:22:56.637Z",
                "updatedAt" : "2016-02-18T03:22:56.637Z",
                "user": {
                    "id" : "jake",
                    "username": "jake",
                    "image" : "url",
                    "fullName" : "jake jake"
                },
                "likedByViewer" : true,
                "favoritedByViewer" : true
            }
        ]
    }
}
```

### Get Users liked the post

*Authentication required*

`GET /api/post/:postId/likes`
```JSON
{
    "data" : {
        "count" : 23432,
        "cursor" : "asdfasdfa",
        "users" : [
            {
                "followedByViewer" : true,
                "user" : {
                    "id" : "jake",
                    "username": "jake",
                    "image" : "url",
                    "fullName" : "jake jake"
                }
            }
        ]
    }
}
```

### Get followers 
`GET /api/followers`

*Authentication required*

```JSON
{
    "data" : {
        "count" : 23432,
        "cursor" : "asdfasdfa",
        "users" : [
            {
                "followedByViewer" : true,
                "user" : {
                    "id" : "jake",
                    "username": "jake",
                    "image" : "url",
                    "fullName" : "jake jake"
                }
            }
        ]
    }
}
```

## How to build and run this project
* Install
    * Install MongoDB on your local.
    * create **.env** file and copy content from env.example to **.env** file.
    * Change the `DB` to **`mongodb://localhost:27017/twitter-clone`** in **.env** file.
    * Execute `npm start`.
    * Go postman and checkout the api's








