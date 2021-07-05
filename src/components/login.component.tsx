import React from "react";
import LoginForm from "./login-form.component";

class Login extends React.Component {
    render(): any {
        return (
            <div id="login">
                <h1>Login</h1>

                <LoginForm />
            </div>
        );
    }
}

export default Login;