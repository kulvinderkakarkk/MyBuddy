import React from 'react'
import { Grid} from 'semantic-ui-react'
import gql from 'graphql-tag'
import {useQuery} from '@apollo/react-hooks'
import {ReactSpinner} from 'react-spinning-wheel';
import 'react-spinning-wheel/dist/style.css';
import PostCard from '../components/PostCard'
function Home() {
    const {loading,data}=useQuery(QUERY_GET_POSTS);
    if(data) {
        console.log("data is",data)
    }
    return (
        <Grid columns='three'>
        <Grid.Row>
            {loading? <ReactSpinner />: (data.getPosts && data.getPosts.map(post=>(
                <Grid.Column style={{marginBottom:20, marginTop:10}}>
                <PostCard post={post} />
                </Grid.Column>
            )))}
        </Grid.Row>
      </Grid>
    )
}

const QUERY_GET_POSTS=gql`
    {getPosts {
        id
        body
        username
        createdAt
        likes {
            id
            username
            createdAt
        }
        comments {
            id
            body
            username
            createdAt
        }
        likeCount
        commentCount
    }}
`

export default Home;