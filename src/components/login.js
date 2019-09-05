import React, { Component } from 'react'
import firebase from '../firebase/firebase'

export default class Login extends Component {
    state = {
        username: '',
        password: ''
    }

    onChangeHandler = (e) => {
        const { name, value } = e.target;
        //console.log(name, value)
        this.setState({
            [name]: value
        })
    }

    onClickHandler = (e) => {
        e.preventDefault()
        firebase.doSignInWithEmailAndPassword(this.state.username, this.state.password)
            .then(res => {
                //console.log(res)
                this.props.login()
                this.setState({
                    username: '',
                    password: ''
                })
            })
    }


    render() {
        const { username, password } = this.state
        return (
            <div className="login" style={{margin:"30px", display:"flex", justifyContent:"flex-end"}}>
                <form>
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input className="input is-rounded is-success is-small" style={{ width: "200px" }} type="email" name="username" placeholder="Email" value={username} onChange={this.onChangeHandler} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-envelope"></i>
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control has-icons-left has-icons-right">
                            <input className="input is-rounded is-success is-small" style={{ width: "200px" }} type="password" name="password" placeholder="Password" value={password} onChange={this.onChangeHandler} />
                            <span className="icon is-small is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </p>

                    </div>
                    <div className="field">
                        <button className="button is-rounded is-primary" style={{ width: "200px" }} onClick={this.onClickHandler}>Login</button>
                    </div>


                </form>
            </div >

        )
    }
}