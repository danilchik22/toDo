import React from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = { login: "", password: "" }
    }
    handleSubmit(event) {
        this.props.get_token(this.state.login, this.state.password)
        event.preventDefault()
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        );
        event.preventDefault()
    }
    render() {
        if (this.props.auth()) return <Navigate to="/" />
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <input type="text" name="login" placeholder="login"
                    value={this.state.login} onChange={(event) => this.handleChange(event)}></input>
                <input type="text" name="password" placeholder="password"
                    value={this.state.password} onChange={(event) => this.handleChange(event)}></input>
                <input type="submit" value="Login"></input>
            </form>

        );
    }

}

export default Login;