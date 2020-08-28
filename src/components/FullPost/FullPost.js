import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.module.css';

class FullPost extends Component {
    state = {
        loadedPost: null
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.selectedPostId && prevProps.selectedPostId !== this.props.selectedPostId)
            axios.get('https://jsonplaceholder.typicode.com/posts/' + this.props.selectedPostId)
                .then(response => {
                    // console.log(response, prevProps, prevState, snapshot)
                    this.setState({loadedPost: response.data})
                })
    }

    render () {
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if(this.props.selectedPostId) {
            post = <p style={{textAlign: 'center'}}>Loading...</p>;
        }
        if(this.state.loadedPost) {
            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button className="Delete">Delete</button>
                    </div>
                </div>

            );
        }
        return post;
    }
}

export default FullPost;