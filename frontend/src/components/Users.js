import React from 'react';

const User = ({ user }) => {
    return (
        <tbody>
            <tr>
                <td key="{user_name}">{user.username}</td>
                <td key="{first_name}">{user.first_name}</td>
                <td key="{last_name}">{user.last_name}</td>
                <td key="{e_mail}">{user.email}</td>
            </tr>
        </tbody>

    )
}

const UserList = ({ users }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th key="{username}">
                        UserName
                    </th>
                    <th key="{firstname}">
                        FirstName
                    </th>
                    <th key="{lastname}">
                        LastName
                    </th>
                    <th key="{email}">
                        Email
                    </th>
                </tr>
            </thead>
            {users.map((user) => <User user={user} />)}
        </table>
    )
}

export default UserList 