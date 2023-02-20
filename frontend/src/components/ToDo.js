import React from "react";

const ItemToDo = ({ todo, projects, users }) => {
    let opened;
    todo.opened ? opened = "Открыта" : opened = "закрыта";
    return (
        <tbody>
            <tr>
                <td>
                    {todo.id}
                </td>
                <td>
                    {projects.find((project) => {
                        return project.id === todo.project
                    }).name}
                </td>
                <td>
                    {todo.text}
                </td>
                <td>
                    {todo.createdAt}
                </td>
                <td>
                    {todo.updatedAt}
                </td>
                <td>
                    {users.find((user) => {
                        return user.id === todo.user
                    }).username}
                </td>
                <td>
                    {opened}
                </td>
            </tr>
        </tbody>

    )
}

const ToDoList = ({ projects, users, todos }) => {
    return (
        <table className="tableComponents">
            <thead>
                <tr>
                    <th>
                        Id ToDo
                    </th>
                    <th>
                        Name Project
                    </th>
                    <th>
                        Text To-Do
                    </th>
                    <th>
                        Created Date
                    </th>
                    <th>
                        Updated Date
                    </th>
                    <th>
                        User created
                    </th>
                    <th>
                        Opened
                    </th>
                </tr>
            </thead>

            {todos.map((item) => <ItemToDo todo={item} projects={projects} users={users} />)}
        </table>
    )
}

export default ToDoList;