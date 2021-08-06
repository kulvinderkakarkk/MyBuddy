## MyBuddy
MyBuddy is a social media application similar to other social media websites. This social media website allows one to add/delete,like or comment on a post. You can click on the comment button to comment which will redirect you to a another page displaying the full post with an option to add/delete a comment even. Isn't that awesome??

What more awesome is that this application is built on modern technology stacks such as **React, NodeJS and GraphQL API**.

## Steps to run the application
You need to run the GraphQL API server (built on NodeJS platform) and react application which acts as BFF

### Steps to run GraphQL API server
1. cd into the root directory.
2. Run `npm install`
3. Run `npm start`
(If you wish to run GraphQL queries, you can run it on localhost:5000)
### Steps to run React application
1. cd into root directory again.
2. cd into client sub-directory
3. Run `npm install`
4. Run `npm start`
5. RUn the react application in browser by visiting url `http://localhost:3000/`

## About the Application

### GraphQL server
This apollo GraphQL server is built on NodeJS platform which uses a combination of queries and mutations. You can access the server on `http://localhost:5000/` once started. The various queries and mutations configuration (or database schema) can be found in the below table :
| Type | Type name | parameters required | parameters output | Description |
| :---         |     :---:      |          ---: |          ---: |          ---: |
| query  | getPost     | postId    | id, username, body, createdAt, likeCount, commentCount, like {id, username, createdAt}, comment{id, username,body, createdAt }|  find a post with postId |
| query     | getPosts       |       | id, username, body, createdAt, likeCount, commentCount, like {id, username, createdAt}, comment{id, username,body, createdAt } | find all posts | 
| mutation    | register       | username, password, confirmPassword, email | id, username, token, email | Register user | 
| mutation    | login       |       |username, password| id, username, token | 
| mutation     | createPost | body      | id, username, body, createdAt, likeCount, commentCount, like {id, username, createdAt}, comment{id, username,body, createdAt } | Create a post. Be sure to set authorization token in header received from login mutation | 
| mutation     | deletePost       |  postId     | String | Delete post | 
| mutation     | createComment       | postId, body  | id, username, body, createdAt, likeCount, commentCount, like {id, username, createdAt}, comment{id, username,body, createdAt } | Add comment on a post. Be sure to add authorization token in header |
| mutation     | deleteComment       | postId, commentId  | id, username, body, createdAt, likeCount, commentCount, like {id, username, createdAt}, comment{id, username,body, createdAt } | Delete comment on a post. Be sure to add authorization token in header | 
| mutation     | likePost       | postId  | id, username, body, createdAt, likeCount, commentCount, like {id, username, createdAt}, comment{id, username,body, createdAt } | Like/Unlike a post. Be sure to add authorization token in header |

## React application
The react application uses modern hooks, functional componenta, redux and other functionalities used in react and real industry projects such as use of contexts to save global state of user login data and reducers to carry login/logout actions. Also, json web tokens have been used to hash login information and automatically logout user if it exceeds expire time which is one hour in this case. Cache's have been used to increase the performance of application.

## Some of the functionalities and validations integrated
- You need to register to login and access functionalities
- Login and register forms have added validations.
- You can see the post but you won't be able to like/comment a post unless you are logged in.
- Once logged in you can delete a post or comment only that you created.
- Click on the comment id to load the post in a new window and add a comment.
- Once logged in you cannot login again unless you logout.
- Unless logged in, you cannot create a post.
 
