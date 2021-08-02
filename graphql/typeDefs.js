const gql= require('graphql-tag')

module.exports=gql`
    type Post {
        id:ID!,
        username:String!,
        body: String!,
        likes: [Like]!,
        comments:[Comment]!
        createdAt: String!
    }

    type Like {
        id: ID!,
        username: String!,
        createdAt: String!
    }
    
    type Comment {
        id:ID!,
        username: String!,
        createdAt: String!
    }

    type Query {
        getPosts:[Post],
        getPost(postId:ID!):Post
    }
    
    type User {
        id:ID!,
        username: String!,
        password: String!,
        email: String!,
        createdAt: String!,
        token: String!
    }

    input RegisterInput {
        username: String!,
        password: String!,
        confirmPassword: String!,
        email: String!
    }

    type Mutation {
        register(registerInput: RegisterInput): User
        login(username: String!, password: String!): User
        createPost(body: String): Post!
        deletePost(postId:ID!): String
        createComment(postId:ID!, body:String):Post!
        deleteComment(postId:ID!, commentId:ID!): Post!
        likePost(postId:ID!):Post!
    }
`
