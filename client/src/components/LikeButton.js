import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import { Button, Icon, Label  } from 'semantic-ui-react'
import MyPopup from '../util/mypopup'
function LikeButton({user, post:{id, likes, likeCount}}) {
    const [liked,setLiked]=useState(false)
    useEffect(()=> {
        if(user && likes.find(like=>user.username===like.username)){
            setLiked(true)
        } else setLiked(false)
    },[user,likes]) 
    
    const [likePost]=useMutation(LIKE_POST_MUTATION,{
        onError(err) {
        },
        variables: {postId:id}})
    const likeButton = user ? (
        liked ? (<MyPopup content= "Unlike Post"><Button color='teal'>
        <Icon name='heart' />
    </Button></MyPopup>):(<MyPopup content= "Like Post">
        <Button color='teal' basic>
        <Icon name='heart' />
    </Button></MyPopup>)): (<MyPopup content= "Login to Like Post"><Button as={Link} to="/login" color='teal' basic>
            <Icon name='heart' />
        </Button></MyPopup>);
    return (
        <>
        <Button as='div' labelPosition='right' onClick={likePost}>
            {likeButton}
        <Label basic color='teal' pointing='left'>
            {likeCount}
        </Label>
        </Button>
        </>
        
    )
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton;