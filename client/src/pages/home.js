import React, {useContext} from 'react'
import { useQuery} from '@apollo/react-hooks'
import {Fetch_POSTS_QUERY} from '../util/graphql'
import { Grid, Transition } from 'semantic-ui-react'
import PostCard from '../components/PostCard'
import {ReactSpinner} from 'react-spinning-wheel';
import 'react-spinning-wheel/dist/style.css';
import { useQueryWithStore } from 'react-admin';
import PostForm from '../components/PostForm'
import {AuthContext, AuthProvider} from '../context/auth'
function Home() {
    var posts=null;
    var {user} = useContext(AuthContext)
    const {loading, data} = useQuery(Fetch_POSTS_QUERY)
    if(data) {
       posts = data.getPosts
    }
    return (
    <Grid columns={3} divided >
        <Grid.Row>
           {user && <PostForm></PostForm>}
        </Grid.Row> 
        <Grid.Row>
            <h1> Recent Posts</h1>
        </Grid.Row>
        <Grid.Row>
        <Transition.Group>
        {loading ? (<ReactSpinner />):(posts && posts.map(post => (
            <Grid.Column key= {post.id} style={{marginBottom: 20}}>
                <PostCard user={user} post = {post} />
            </Grid.Column>
        )))}
        </Transition.Group>
        </Grid.Row>
    </Grid>
    )
}



export default Home;