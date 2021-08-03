import React from 'react'
import { Card, Icon, Image, Button, Label } from 'semantic-ui-react'
import moment from 'moment'
import { Link } from 'react-router-dom';

function PostCard({post:{id, username, body, createdAt, likes, comments, likeCount, commentCount}}) {
    return (
        <Card fluid>
            <Image
            style={{margin:"auto"}}
          size='medium'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'/>
            
            <Card.Content>
            <Card.Header>{username}</Card.Header>
            <Card.Meta>
                <span className='date'>{moment(createdAt).fromNow(true)}</span>
            </Card.Meta>
            <Card.Description>
                {body}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <div>
                <Button as='div' labelPosition='right'>
                <Button color='red' basic>
                    <Icon name='heart' />
                </Button>
                <Label as='a' basic color='red' pointing='left'>
                    {likeCount}
                </Label>
                </Button>
                <Button as='div' labelPosition='right' as={Link} to={`/posts/${id}`}>
                <Button basic color='blue'>
                    <Icon name='fork' />
                </Button>
                <Label as='a' basic color='blue' pointing='left'>
                    {commentCount}
                </Label>
                </Button>
            </div>
            </Card.Content>
        </Card>
    )
}

export default PostCard;