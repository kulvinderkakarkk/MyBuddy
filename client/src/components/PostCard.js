import React from 'react'
import { Button, Card, Image, Icon, Label  } from 'semantic-ui-react'
import moment from 'moment'
import {Link} from 'react-router-dom'
import LikeButton from './LikeButton'
import _ from './DeleteButton'
import DeleteButton from './DeleteButton'
import MyPopup from '../util/mypopup'
function PostCard({user, post: {username, createdAt, body, id, likeCount, commentCount, likes}}) {
    return (
        <Card fluid>
      <Card.Content>
        <MyPopup content={"I am " + username}>
        <Image
          floated='right'
          size='medium'
          src='https://www.cnet.com/a/img/IQ1urIoTYAkhsFeTKmEU4B6zvEM=/940x0/2018/01/08/34a43a1b-d85a-4b85-bce1-74654d30a6c5/james-damore.jpg'
        />
        </MyPopup>
        <Card.Header>{username}</Card.Header>
        <Card.Meta as={Link} to={`/posts/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user= {user} post={{id, likes,likeCount}}></LikeButton>
        {user ?(<MyPopup content = "Add Comment"><Button as='div' labelPosition='right' as={Link} to={`/posts/${id}`}>
        <Button basic color='blue'>
            <Icon name='comments' />
            {commentCount}
        </Button>
        </Button></MyPopup>):(<MyPopup content = "Login to add Comment"><Button as='div' labelPosition='right'>
        <Button basic color='blue'>
            <Icon name='comments' />
            {commentCount}
        </Button>
        </Button></MyPopup>)}
        
        {(user && (user.username === username) && (
           <DeleteButton postId={id} />
          
        ))}
        
      </Card.Content>
    </Card>
    )
}

export default PostCard;