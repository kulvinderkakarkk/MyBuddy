const gql= require('graphql-tag')
const mongoose= require('mongoose')
const {ApolloServer} = require("apollo-server") 


const typeDefs=gql`
    type Post {
        id:ID!
    }
    type Query {
        getPosts:[Post]
    }
`
const resolvers=()=>{return "Hello world"} 


const server=new ApolloServer({typeDefs, resolvers})

mongoose
    .connect('mongodb+srv://kulvinderkakar:2EWgFaxlCDs8Aq2T@cluster0.mbeef.mongodb.net/MyBuddy?retryWrites=true&w=majority', {useNewUrlParser:true, useUnifiedTopology: true})
    .then(()=>{
        console.log("MONGODB is running")
        return server.listen({port:5000})
    })
    .catch((err)=>{
        console.log("Error while connecting to MONGODB")
    })

