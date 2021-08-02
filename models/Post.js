const {model, Schema} =require('mongoose')

const postSchema = new Schema({
    body: String, 
    username: String,
    createdAt: {type:Date, default: Date.now},
    likes: [
        {
            username: String,
            createdAt:{type:Date, default: Date.now}
        }
    ],
    comments: [
        {
            username: String,
            createdAt:{type:Date, default: Date.now},
            body: String
        }
    ],
    user: {
        type: Schema.Types.ObjectId,
        ref:'users'
    }
});
module.exports=model('Post',postSchema, 'post')