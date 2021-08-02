const {AuthenticationError} =require('apollo-server')
const jwt=require('jsonwebtoken')
const { JWT_SECRET } = require('../config')

module.exports=(context)=> {
    const authHeader = context.req.headers.authorization
    if(authHeader) {
        const token = authHeader.split('Bearer ')[1]
        if (token) {
            try {
                const user =jwt.verify(token, JWT_SECRET);
                return user
            } catch(err) {
                throw new AuthenticationError("Invalid Token")
            }
        } else {
            throw new AuthenticationError("Authorization Token msut be Bearer [token]")
        }
    } else {
        throw new AuthenticationError("Authorization Token not provided")
    }
}