import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { Post } from "../models/posts.model";

interface IProps {
}


interface IState {
    posts: Post[];
    allPosts: Post[];
    sort: number;
    sortOrder: string;
}

class Posts extends React.Component<IProps, IState> {
    private postsUrl = "https://jsonplaceholder.typicode.com/posts";

    constructor(props: any) {
        super(props);
        
        this.state = {
            posts: [],
            allPosts: [],
            sort: 0,
            sortOrder: "No sort"
        }
    }

    render(): any {
        const posts = this.state.posts.map((post) => 
            <tr key={ post.id }>
                <td>{ post.id }</td>
                <td>{ post.title }</td>
                <td>
                    <Link to={{
                            pathname: `/posts/${post.id}`
                        }}
                        style={{ margin: "0 5px" }}>
                        View Detail
                    </Link>
                    |
                    <a href="#!" 
                        onClick={ (e) => { e.preventDefault(); this.onDelete(post.id) }}
                        style={{ margin: "0 5px" }}>
                            Delete
                        </a>
                </td>
            </tr>
        );

        return (
            <div id="posts">
                <h1>Posts</h1>

                <input 
                    type="text" 
                    placeholder="Search by title"
                    style={ 
                        { 
                            margin: '15px' 
                        } 
                    }
                    onChange={(e) => this.onSearchByTitle(e.currentTarget.value)}/>

                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th onClick={ () => this.onSortByTitle() }
                                style={{ width: "85%" }}>
                                Title --Sort ({ this.state.sortOrder })
                            </th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        { posts }
                    </tbody>
                </table>
            </div>
        );
    }

    componentDidMount(): void {
        this.getData();
    }

    private getData(): void {
        axios.get<Post[]>(this.postsUrl)
            .then(response => {
                if (response && response.data) {
                    this.setState({
                        posts: response.data,
                        allPosts: response.data
                    })
                }
            })
            .catch(e => {
                console.log(e);
            })
    }

    private onSortByTitle(): void {
        switch(this.state.sort) {
            case 0:
                this.setState({
                    sort: 1,
                    sortOrder: "ASC"
                });

                this.state.posts.sort((a, b) => a.title.localeCompare(b.title));
                break;
            
            case 1:
                this.setState({
                    sort: -1,
                    sortOrder: "DESC"
                });

                this.state.posts.sort((a, b) => b.title.localeCompare(a.title));
                break;

            case -1:
            default:
                this.setState({
                    sort: 0,
                    sortOrder: "No sort"
                });

                this.state.posts.sort((a, b) => a.id - b.id);
                break;
        }
    }

    private onSearchByTitle(searchString: string): void {
        if (searchString) {
            this.setState({
                posts: this.state.posts.filter(p => p.title.includes(searchString))
            });
        } else {
            this.setState({
                posts: this.state.allPosts
            });
        }
    }

    private onDelete(id: number): void {
        var posts = this.state.allPosts;
        
        const index = this.state.posts.findIndex(p => p.id === id);
        if (index > -1) {
            posts.splice(index, 1);
            
            this.setState({
                posts: posts,
                allPosts: posts
            })
        }
    }
}

export default Posts;

