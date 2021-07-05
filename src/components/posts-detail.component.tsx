import axios from "axios";
import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Post } from "../models/posts.model";
import { RouteParams } from "../models/router-params.model";

interface IProps extends RouteComponentProps<RouteParams> {
}


interface IState {
    post: Post;
}

class PostsDetail extends React.Component<IProps, IState> {
    private postsUrl = "https://jsonplaceholder.typicode.com/posts";

    constructor(props: IProps) {
        super(props);
        
        this.state = {
            post: {} as Post
        }
    }

    render(): any {
        return (
            <div id="postDetail">
                <h1>Posts Detail</h1>

                <div>
                    <span>ID: </span>
                    <span>{ this.state.post.id }</span>
                </div>

                <div>
                    <span>Title: </span>
                    <span>{this.state.post.title}</span>
                </div>

                <div>
                    <span>Body: </span>
                    <span>{this.state.post.body}</span>
                </div>
            </div>
        )
    }

    componentDidMount(): void {
        this.getPostById();
    }

    private getPostById(): void {
        axios.get<Post>(this.postsUrl + `/${this.props.match.params.id}`)
            .then(response => {
                if (response && response.data) {
                    this.setState({
                        post: response.data
                    });
                }
            })
            .catch(e => {
                console.log(e);
            })
    }
}

export default PostsDetail;