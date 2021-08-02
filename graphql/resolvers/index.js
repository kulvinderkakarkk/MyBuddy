const postResolvers= require('./post')
const userResolvers = require('./user')
const commentResolvers = require('./comments')
module.exports= {
    Post: {
        likeCount(parent) {
            return parent.likes.length
        },
        commentCount(parent) {
            return parent.comments.length
        }
    },
    Query: {
        ...postResolvers.Query,
        ...userResolvers.Query,

    },
    Mutation: {
        ...postResolvers.Mutation,
        ...userResolvers.Mutation,
        ...commentResolvers.Mutation
    }
}