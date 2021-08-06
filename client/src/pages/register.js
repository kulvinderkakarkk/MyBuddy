import React, { useContext } from 'react'
import { Button, Checkbox, Form, Message } from 'semantic-ui-react'
import { useState } from 'react'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import {useForm} from '../util/hooks'
import {AuthContext} from '../context/auth'

function Register(props) {
    const context=useContext(AuthContext)
    const [errors,setErrors]=useState({})
   const {values, onSubmit, onChange} = useForm(register_user, {
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    })
    const [addUser, {loading}]= useMutation(REGISTER_USER, {
        update(proxy, {data:{register:userData}}) {
            context.login(userData)
            props.history.push('/')
        }, onError(err) {
            console.log("err",err)
            setErrors(err.graphQLErrors[0].extensions.errors)
            //Object.values(errors).map(value=> console.log(value))
        }
        , variables: values
    })
    
    function register_user() {
        addUser()
    }
    

    return (
    <div className="register-form">
    <Form onSubmit={onSubmit} warning>
    <Form.Input fluid label='Username' placeholder='Username' name = "username" type="text" 
     value={values.username} error={errors.username?true:false} onChange={onChange}/>    
    <Form.Input fluid label='Email' placeholder='Email' name = "email" type="email" 
     value={values.email} error={errors.email?true:false}  onChange={onChange}/>    
    <Form.Input fluid label='Password' placeholder='Password' name = "password" type="password"
     value={values.password} error={errors.password?true:false}  onChange={onChange} />    
    <Form.Input fluid label='Confirm Password' placeholder='Confirm Passwor' name = "confirmPassword" type="password"
     value={values.confirmPassword} error={errors.confirmPassword?true:false}  onChange={onChange} />    
    
    <Form.Button>Submit</Form.Button>
    {Object.keys(errors).length >0 && (<Message 
       warning
       header='Could you check something!'
       list={[Object.values(errors)[0] ]}
     />)  }
  </Form>
  </div>
    )
}

const REGISTER_USER = gql`
    mutation register (
            $username:String!
            $password:String!
            $email:String!
            $confirmPassword:String!
        ) {
            register(registerInput: {
                username: $username
                email: $email
                password: $password
                confirmPassword: $confirmPassword
            }) {
                id 
                email
                username
                createdAt
                token
            }
        }
    
`

export default Register;