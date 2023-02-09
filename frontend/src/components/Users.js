import React from 'react';

const User = ({ user }) => {
    return (
        <tr>
            <td>{user.username}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td>{user.email}</td>
        </tr>
    )
}

const UserList = ({ users }) => {
    return (
        <table>
            <th>
                UserName
            </th>
            <th>
                FirstName
            </th>
            <th>
                LastName
            </th>
            <th>
                Email
            </th>
            {users.map((user) => <User user={user} />)}
        </table>
    )
}

export default UserList 