const postResolvers= require('./post')
const userResolvers = require('./user')

module.exports= {
    Query: {
        ...postResolvers.Query,
        ...userResolvers.Query
    },
    Mutation: {
        ...postResolvers.Mutation,
        ...userResolvers.Mutation
    }
}