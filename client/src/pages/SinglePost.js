import { useMutation, useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import React, {useContext, useState} from 'react'
import {ReactSpinner} from 'react-spinning-wheel';
import 'react-spinning-wheel/dist/style.css';
import { Grid, Image,Card, Icon, Button , Comment, Form, Header} from 'semantic-ui-react'
import LikeButton from '../components/LikeButton'
import moment from 'moment'
import {AuthContext} from '../context/auth'
import DeleteButton from '../components/DeleteButton'
function SinglePost(props) {
    const {user} = useContext(AuthContext)
    const postId= props.match.params.postId;
    const [comment, setComment]=useState('')
    const {
        data
      } = useQuery(FETCH_POST_QUERY, {
        onError(err) {
          props.history.push('/')
          alert("Invalid Post")
        },
        variables: {
          postId
        }
      });
    let postMarkup
    // Add comments
    const [addComment] = useMutation(ADD_COMMENT_MUTATION,{
      update(_,result) {
        setComment('')
        console.log("comments are",result)
        window.location.reload(false)
      }, onError(err) {
        console.log("Error is ", err)
      }, variables: {
        postId,
        body: comment

      }
    })
    function deletePostCallback() {
      props.history.push('/')
    }
    const username=null
    if(!data) {
        postMarkup= (<ReactSpinner />)
    } else {
        const {id, username, body, createdAt, likeCount, commentCount, likes, comments} = data.getPost
        postMarkup =(
        <Grid columns={2} divided>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
            size="small"
            src='https://www.cnet.com/a/img/IQ1urIoTYAkhsFeTKmEU4B6zvEM=/940x0/2018/01/08/34a43a1b-d85a-4b85-bce1-74654d30a6c5/james-damore.jpg' />
          </Grid.Column>
          <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
            <Card.Header>{username}</Card.Header>
            <Card.Meta>
                <span className='date'>{moment(createdAt).fromNow()}</span>
            </Card.Meta>
            <Card.Description>
                {body}
            </Card.Description>
            </Card.Content>
            <hr />
            <Card.Content extra>
                <LikeButton  user = {user} post={{id, likes, likeCount}} />
                <Button basic color='blue' >
                    <Icon name='comments' />
                    {commentCount}
                </Button>
                {(user.username===username) && (<DeleteButton postId={id} callback={deletePostCallback}/>)}    
            </Card.Content>
            </Card>
            <hr />
            <Comment.Group>
              { comments.map((comment,i)=>{                
                return(
                  <Comment key={comment.id}>
                <Comment.Avatar as='a' src='https://www.cnet.com/a/img/IQ1urIoTYAkhsFeTKmEU4B6zvEM=/940x0/2018/01/08/34a43a1b-d85a-4b85-bce1-74654d30a6c5/james-damore.jpg' />
                {user && user.username == comment.username && (
                  <DeleteButton postId={id} commentId={comment.id} />
                )}
                <Comment.Content>
                  <Comment.Author>{comment.username}</Comment.Author>
                  <Comment.Metadata>
                    <div>{moment(comment.createdAt).fromNow()}</div>
                  </Comment.Metadata>
                  <Comment.Text>
                    {comment.body}
                  </Comment.Text>
                </Comment.Content>
              </Comment>
                
             )})}
                <Form reply>
                <Comment>
                <Comment.Avatar as='a' src='https://www.cnet.com/a/img/IQ1urIoTYAkhsFeTKmEU4B6zvEM=/940x0/2018/01/08/34a43a1b-d85a-4b85-bce1-74654d30a6c5/james-damore.jpg' />
                <Comment.Content>
                  <Comment.Author style={{marginBottom:"5px"}}>{user.username}</Comment.Author>
                  <input value ={comment}  style={{marginBottom:"10px"}} name= "comment" onChange={(event)=> setComment(event.target.value)}/>
                </Comment.Content>
                <Button  content='Add Comment' disabled={comment.trim()==""} labelPosition='left' icon='edit' onClick={addComment} primary />
              </Comment>
                  
                </Form> 
    
            </Comment.Group>
          </Grid.Column>
          <Grid.Column>
            </Grid.Column>
        </Grid.Row>
      </Grid>
    )
    }

    return postMarkup;

}

const ADD_COMMENT_MUTATION= gql`
  mutation createComment(
    $postId:ID!
    $body:String!) {
      createComment(
        postId:$postId
        body:$body){
      id
      comments {
        id
        body
        createdAt
        username
      }}
    }
  
`

const FETCH_POST_QUERY = gql`
  query($postId: ID!) {
    getPost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
export default SinglePost;