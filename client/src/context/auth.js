import {decode} from 'jsonwebtoken'
import React, {createContext, useReducer} from 'react'
import jwdDecode from 'jwt-decode'

const initialState={user:null}

const AuthContext = createContext({
    user:null,
    login: (userData)=> {},
    logout: ()=> {}
})

function authReducer(state,action) {
    switch(action.type) {
        case 'LOGIN': 
            return {
                ...state,
                user:action.payload
            } 
        case 'LOGOUT': 
        return {
            ...state,
            user:null
        } 
    }
}

function AuthProvider(props) {
    const [state,dispatch]=useReducer(authReducer, initialState)
    function login(userData) {
        dispatch({
            type:'LOGIN',
            payload:userData
        })
    }
    function logout() {
        dispatch({
            type:'LOGOUT'
        })
    }

    return <AuthContext.Provider 
                value={{user:state.user,login,logout}}
                {...props}
            />
}

export {AuthContext,AuthProvider}