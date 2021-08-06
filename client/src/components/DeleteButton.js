import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, { useState } from 'react'
import {Button, Icon, Confirm } from 'semantic-ui-react'
import {Fetch_POSTS_QUERY} from '../util/graphql'
import MyPopup from '../util/mypopup'
function DeleteButton({postId, commentId, callback}) {
    const [confirmOption, setConfirmOption]=useState(false)
    const mutation = commentId ? DELETE_COMMENT_MUTATION:DELETE_POST_MUTATION
    const [deletePostorMutation]= useMutation(mutation,{
        update(proxy,result) {
            setConfirmOption(false)
            console.log("Post Deleted")
            if(!commentId) {
                const data = proxy.readQuery({
                    query: Fetch_POSTS_QUERY
                })
                data.getPosts = data.getPosts.filter(p=>p.id!== postId)
                proxy.writeQuery({
                    query: Fetch_POSTS_QUERY,
                    data
                })
            } 
            if(callback) {
                callback()}
        }, onError(err) {
            console.log("err is",err)
        },
        variables: {
            postId:postId,
            commentId:commentId
        }
    })
    return (
        <>
        <MyPopup content= {commentId?"Delete Comment":"Delete Post"}>
        <Button basic color='red' floated="right" onClick={()=>setConfirmOption(true)}>
                <Icon name='trash' />
                
        </Button>
        </MyPopup>
        <Confirm
          open={confirmOption}
          content='Are you sure you want to delete the Post?'
          onCancel={()=> setConfirmOption(false)}
          onConfirm={deletePostorMutation}
        />
        </>
    )
}


const DELETE_COMMENT_MUTATION=gql`
mutation deleteComment(
    $postId: ID!,
    $commentId:ID!) {
        deleteComment(
            postId:$postId
            commentId:$commentId) {
                id
                username
                body
                comments {
                    id
                    username
                    body
                    createdAt
                }
                likes {
                    id 
                    username
                    createdAt
                }
                commentCount
                likeCount
            }
    }
`;

const DELETE_POST_MUTATION = gql`
mutation deletePost(
    $postId: ID!) {
        deletePost(postId: $postId) 
    }

`

export default DeleteButton;