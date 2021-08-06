const Post = require('../../models/Post')
const checkAuth= require("../../util/check-auth")
const {AuthenticationError, UserInputError} = require('apollo-server')

module.exports = {
    Mutation: {
        async createComment(_,{postId, body}, context) {
            const user=checkAuth(context)
            const post = await Post.findById(postId)
            if (body.trim()==="") {
                throw new UserInputError("Body field should not be empty", {
                    errors: {
                        body:"Body fiels should not be empty"
                    }
                })
            }
            if(post) {
                console.log("comments",post)
                post.comments.unshift({
                    username:user.username,
                    body,
                    createdAt:new Date().toISOString()
                })
                await post.save()
                return post
            } else {
                throw new UserInputError("Post not found", {
                    errors: {
                        message:"post not found"
                    }
                })
            }
        },
    async deleteComment(_,{postId, commentId},context) {
        const user= checkAuth(context);
        const post = await Post.findById(postId);
        if(post){
            const commentIndex= post.comments.findIndex((c)=>c.id===commentId)
            if(post.comments[commentIndex].username === user.username) {
                post.comments.splice(commentIndex,1)
                await post.save()
                return post
            } else {
                throw new AuthenticationError("Not allowed to delete post")
            }
        } else {
            throw new UserInputError("Post not found", {
                errors: {
                    message:" Post not found"
                }
            })
        }
    }
} }