import { Switch, Route } from "react-router-dom";
import Home from "../components/home.component";
import Login from "../components/login.component";
import PostsDetail from "../components/posts-detail.component";
import Posts from "../components/posts.component";
import Profile from "../components/profile.component";

export default function RouterIndex() {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>

            <Route exact path="/posts">
                <Posts />
            </Route>

            <Route exact path="/profile">
                <Profile />
            </Route>

            <Route exact path="/login">
                <Login />
            </Route>

            <Route exact path="/posts/:id" component={ PostsDetail } />
        </Switch>
    )
}