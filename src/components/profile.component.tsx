import React from "react";
import { LoginContext } from "../providers/login-context.provider";
import LoginForm from "./login-form.component";

interface IProp {
    
}

interface IState {

}

class Profile extends React.Component<IProp, IState> {
    render(): any {
        const profile = <LoginContext.Consumer>
            {
                (context) => {
                    if (context.profile.isLogin) {
                        return (
                            <div>
                                <label htmlFor="userId">User Id: </label>
                                <span id="userId">{context.profile.userId}</span>
                                <br />
                                <label htmlFor="name">Name: </label>
                                <span id="name">{context.profile.name}</span>
                            </div>
                        )
                    } else {
                        return (
                            <div>
                                <b>Login to see your profile</b>
                                <br />
                                <LoginForm />
                            </div>
                        )
                    }
                }
            }
        </LoginContext.Consumer>
        
        return (
            <div id="profile">
                <h1>Profile</h1>

                { profile }
            </div>
        )
    }
}

export default Profile;