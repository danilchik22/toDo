import React from 'react';
import { BrowserRouter, Route, Link, Routes, Outlet } from 'react-router-dom'
import Projects from "./Projects"
import UserList from './Users';
import ToDoList from './ToDo';

const Head = () => {
    return (
        <div className="head">
            <nav>
                <ul>
                    <li> <Link to="/users"> All users </Link> </li>
                    <li> <Link to="/projects"> Projects </Link> </li>
                    <li> <Link to="/todos"> ToDoLists </Link> </li>
                </ul>
            </nav>
            <Outlet />

        </div>

    )


}

export default Head;