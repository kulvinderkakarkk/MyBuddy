import React, { useContext } from 'react'
import { Button, Checkbox, Form, Message } from 'semantic-ui-react'
import { useState } from 'react'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import {useForm} from '../util/hooks'
import {AuthContext, AuthProvider} from '../context/auth'
function Login(props) {
    const context=useContext(AuthContext)
    const [errors,setErrors]=useState({})
   const {values, onSubmit, onChange} = useForm(login_user, {
        username:'',
        password:''
    })
    const [LoginUser, {loading}]= useMutation(LOGIN_USER, {
        update(proxy, {data: {login:userData}}) {
            context.login(userData)
            console.log("authcontext user:",context)
            props.history.push('/')
        }, onError(err) {
            setErrors(err.graphQLErrors[0].extensions.errors)
        }
        , variables: values
    })
    
    function login_user() {
        LoginUser()
    }
    

    return (
    <div className="register-form">
    <Form onSubmit={onSubmit} warning>
    <Form.Input fluid label='Username' placeholder='Username' name = "username" type="text" 
     value={values.username} error={errors.username?true:false} onChange={onChange}/>     
    <Form.Input fluid label='Password' placeholder='Password' name = "password" type="password"
     value={values.password} error={errors.password?true:false}  onChange={onChange} />    
    <Form.Button>Login</Form.Button>
    {Object.keys(errors).length >0 && (<Message 
       warning
       header='Could you check something!'
       list={[Object.values(errors)[0] ]}
     />)  }
  </Form>
  </div>
    )
}

const LOGIN_USER = gql`
    mutation login (
            $username:String!
            $password:String!
        ) {
            login(
                username: $username
                password: $password
            ) {
                id 
                email
                username
                createdAt
                token
            }
        }
    
`

export default Login;