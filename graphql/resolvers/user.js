const User = require('../../models/User')
const {UserInputError}= require('apollo-server')
const bcrypt = require('bcrypt')
const {validateRegisterInput, validateLoginInput} = require('../../util/validators')
const jwt=require('jsonwebtoken')
const { JWT_SECRET } = require('../../config')
function generateToken(user) {
    return jwt.sign({
        id:user.id,
        username: user.username,
        email:user.email
    },JWT_SECRET,{expiresIn:'1h'})
}

module.exports = {
    Mutation: {
        async login(_,{username, password}) {
            // Validate Login
            const {errors, valid} = validateLoginInput(username, password)
            if(!valid) {
                throw new UserInputError("Errors",{errors})
            }
            const user= await User.find({username})
            if(!user) {
                errors.general="Invalid username"
                throw new UserInputError("user not found", errors)
            } 
            match= await bcrypt.compare(password, user.password)
            if(!match) {
                errors.general+"invalid password for username" + username;
                throw new UserInputError("Password mismatch", errors)
            }
            const token = generateToken(user);
            return {
                ...user._doc,
                token,
                id: user._id
            }
        },
        async register(_,{registerInput: {username, password, email, confirmPassword}}) {
            // Validate Register
            const {errors, valid}= validateRegisterInput(username, password, email, confirmPassword)
            console.log("error valid", errors, valid)
            if (!valid) {
                throw new UserInputError('Errors',{errors})
            }
            // Check authorization token
            // Check if user already exist
            const user= await User.findOne({username});
            if (user) {
                throw new UserInputError('Username is taken', {
                    error: {
                        username: "This username is already taken"
                    }
                })
            }
            // Hash password
            password=await bcrypt.hash(password,12)
            // Insert new user record
            const newUser= new User({username, email, password, createdAt: new Date().toISOString()})
            const res = await newUser.save()
            console.log("res is",res)
            token= generateToken(res)
            return {
                ...res._doc,
                id: res._id,
                token
            }
        }
    }
}
