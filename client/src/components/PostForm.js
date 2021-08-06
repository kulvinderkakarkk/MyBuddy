import React from 'react'
import { Grid, Form } from 'semantic-ui-react'
import {useForm} from '../util/hooks'
import {Fetch_POSTS_QUERY} from '../util/graphql'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
function PostForm() {
    const {values,onChange,onSubmit} = useForm(createPostCallback, {
        body:''
    })
    
    const [createPost, {loading}]= useMutation(MUTATION_CREATE_POST, {
        update(proxy, result) {
            const data =proxy.readQuery({
                query: Fetch_POSTS_QUERY
            })
            data.getPosts = [result.data.createPost,...data.getPosts]
            proxy.writeQuery({query:Fetch_POSTS_QUERY,data:{...data}})
            values.body = ""
            window.location.reload(false)
        }, variables: values
    })
    
    function createPostCallback() {
        createPost()
    }
    return (
        
        <Form onSubmit={onSubmit}>
            <h2>Create a Post</h2>
            <Form.Input fluid label="What's on your mind?" placeholder="Description..." name = "body" type="text" 
              value={values.body} onChange={onChange}/>   
            <Form.Button>Post</Form.Button> 
        </Form>
       
    )
}

const MUTATION_CREATE_POST=gql`
mutation createPost($body:String!) {
    createPost(body:$body) {
        id body createdAt username likes{
            id username createdAt
        }
        likeCount commentCount comments {
            id username createdAt body
        }
    }
}
`

export default PostForm;