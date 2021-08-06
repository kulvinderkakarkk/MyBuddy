MyBuddy
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
This G

## Some of the functionalities and validations integrated
- You can see the post but you won't be able to like/comment a post unless you are logged in.
- Once logged in you can delete a post or comment only that you created.
- Click on the comment id to load the post in a new window and add a comment.
- Once logged in you cannot login again unless you logout.
- Unless logged in, you cannot create a post.
 
