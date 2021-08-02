const {model, Schema} = require("mongoose")
const {GraphQLDateTime}=require("graphql-iso-date")

const userSchema = new Schema({
    username: String,
    password: String,
    email: String,
    createdAt: GraphQLDateTime
})

module.exports=model('User',userSchema,'user');

