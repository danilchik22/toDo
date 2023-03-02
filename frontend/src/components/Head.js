import React from 'react';
import { BrowserRouter, Route, Link, Routes, Outlet } from 'react-router-dom'
import Projects from "./Projects"
import UserList from './Users';
import ToDoList from './ToDo';

class Head extends React.Component {

    render() {
        console.log(this.props.nameuser)
        return (
            <div className="main">
                <nav>
                    <ul className="head">
                        <li> <Link to="/users"> All users </Link> </li>
                        <li> <Link to="/projects"> Projects </Link> </li>
                        <li> <Link to="/todos"> ToDoLists </Link> </li>
                        <li>
                            {this.props.auth() ? <button onClick={() => this.props.logout()}> Logout <br /> User: {this.props.nameuser} </button> : <Link to="/login"> Login </Link>}
                        </li>


                    </ul>
                </nav>
                <Outlet />

            </div>

        )
    }


}

export default Head;