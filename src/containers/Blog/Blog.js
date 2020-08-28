import React, { Component } from 'react';

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.module.css';

import axios from "axios";

class Blog extends Component {

    state={
        authors: ['Max Milian', 'Mosh', 'The Net Ninja'],
        posts: [],
        selectedPostId: null
    }

    componentDidMount() {
        axios.get('https://jsonplaceholder.typicode.com/posts')
            .then(response => {
                const selectedPost = response.data.slice(0,4);
                const updatedPost = selectedPost.map(post => {
                    return {
                        ...post,
                        author: this.state.authors[Math.floor(Math.random() * this.state.authors.length)]
                    }
                })
                this.setState({posts: updatedPost})
            })
    }

    postClickedHandler = (id) => {
        this.setState({selectedPostId: id})
    }

    render () {
        const posts = this.state.posts.map(post => {
            return <Post
                key={post.id}
                title={post.title}
                author={post.author}
                clicked={() => this.postClickedHandler(post.id)}
            />
        })
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost selectedPostId={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;