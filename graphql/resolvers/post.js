const { AuthenticationError, UserInputError } = require('apollo-server')
const Post= require('../../models/Post')
const checkAuth =require('../../util/check-auth')
module.exports = {
    Query: {
        async getPosts() {
            try {
                const posts= Post.find()
                return posts
            } catch(err) {
                throw new Error(err)
            }
        },
        async getPost(_,{postId}) {
            try {
                const post = Post.findById(postId);
                if(post) {
                    return post
                } else {
                    throw new Error('Post not found')
                }
            } catch(err) {
                throw new Error(err)
            }
        }
    },
    Mutation: {
        async createPost(_,{body},context) {
            const user = checkAuth(context)
            const newPost= new Post({
                body,
                user: user.id,
                username: user.username,
                createdAt: new Date().toISOString()
            })
            const post =await newPost.save()
            return post
        },
        async deletePost(_,{postId},context) {
            const user=checkAuth(context)
            const deletePost= await Post.findById(postId);
            if(deletePost.username === user.username) {
                await deletePost.delete()
                return "Post deleted successfully"
            } else {
                throw new AuthenticationError("Username not permitted to delete this post")
            }
        },
        async likePost(_,{postId}, context) {
            const {username} = checkAuth(context);
            const post = await Post.findById(postId);
            if(post) {
                if(post.likes.find(like => like.username === username)) {
                    post.likes = post.likes.filter(like=> like.username!=username)
                } else {
                    post.likes.push({
                        username,
                        createdAt: new Date().toISOString()
                    })
                }
                await post.save()
                return post
            } else {
                throw new UserInputError('Post not found')
            }
        }
    }
}