import axios from "axios";
import React from "react";
import validator from 'validator';
import { LoginContextState } from "../models/login-context.model";
import { Token } from "../models/token.model";
import { LoginContext } from "../providers/login-context.provider";

interface IProps {

}

interface IState {
    email: string,
    password: string,
    inputEmailError: string,
    inputPasswordError: string,
    successMessage: string
}

class LoginForm extends React.Component<IProps, IState> {
    private tokenUrl = "https://60dff0ba6b689e001788c858.mockapi.io/tokens";

    constructor(props: IProps) {
        super(props);
        
        this.state = {
            email: "",
            password: "",
            inputEmailError: "",
            inputPasswordError: "",
            successMessage: ""
        }
    }

    render(): any {
        return (
            <div id="loginForm">
                <div>
                    <label htmlFor="input-email">Email:</label>
                    <input type="text" id="input-email" placeholder="Email" value={ this.state.email } onChange={ (e) => this.onInputEmail(e.currentTarget.value) } />
                    <span style={{
                        color: 'red'
                    }}>{ this.state.inputEmailError }</span>
                </div>

                <div>
                    <label htmlFor="input-password">Password:</label>
                    <input type="password" id="input-password" placeholder="Password" value={this.state.password} onChange={ (e) => this.onInputPassword(e.currentTarget.value) } />
                    <span style={{
                        color: 'red'
                    }}>{ this.state.inputPasswordError }</span>
                </div>
                
                <LoginContext.Consumer>
                    {
                        (context) => {
                            return <button onClick={() => this.onLogin(context)}>Login</button>
                        }
                    }
                </LoginContext.Consumer>
                
                <br />

                <span style={{
                    color: 'green'
                }}>{ this.state.successMessage }</span>
            </div>
        )
    }

    private onInputEmail(email: string) {
        this.setState({
            email: email
        });

        if (!email) {
            this.setState({
                inputEmailError: "This field is required"
            });

            return;
        }

        if (!validator.isEmail(email)) {
            this.setState({
                inputEmailError: "Must be a valid email"
            });

            return;
        }

        this.setState({
            inputEmailError: ""
        });
    }

    private onInputPassword(password: string) {
        this.setState({
            password: password
        });

        if (!password) {
            this.setState({
                inputPasswordError: "This field is required"
            });

            return;
        }

        if (password.length < 8) {
            this.setState({
                inputPasswordError: "Password must be at least 8 characters"
            });

            return;
        }

        this.setState({
            inputPasswordError: ""
        });
    }

    private onLogin(context: LoginContextState): void {
        if (this.state.inputEmailError || this.state.inputPasswordError) {
            return;
        }

        var requestBody = {
            email: this.state.email,
            password: this.state.password
        };

        axios.post<Token>(this.tokenUrl, requestBody)
            .then(response => {
                if (response && response.data) {
                    context.saveLoginProfile({
                        isLogin: true,
                        name: "TungNT - SD3064",
                        userId: response.data.userId
                    });

                    this.setState({
                        successMessage: "Login successfully"
                    })
                } else {
                    alert("Login failed");
                }
            })
            .catch(e => {
                console.log(e);
            })
    }
}

export default LoginForm;