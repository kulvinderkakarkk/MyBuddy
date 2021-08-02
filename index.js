const gql= require('graphql-tag')
const mongoose= require('mongoose')
const {ApolloServer} = require("apollo-server") 
const Post = require('./models/Post')
const typeDefs= require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const { MONGODB } = require('./config')

const server=new ApolloServer({typeDefs, resolvers, context: ({req})=>({req})})

mongoose
    .connect(MONGODB, {useNewUrlParser:true, useUnifiedTopology: true})
    .then(()=>{
        console.log("MONGODB is running")
        return server.listen({port:5000})
    })
    .catch((err)=>{
        console.log("Error while connecting to MONGODB", err)
    })

