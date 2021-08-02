import {model, Schema} from 'mongoose'
const {GraphQLDateTime}= require('graphql-iso-date')

const postSchema = new Schema({
    body: String, 
    username: String,
    createdAt: String,
    likes: [
        {
            username: String,
            createdAt:GraphQLDateTime
        }
    ],
    comments: [
        {
            username: String,
            createdAt:GraphQLDateTime,
            body: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref:'users'
    }
});
module.exports=model('Post',postSchema, 'post')