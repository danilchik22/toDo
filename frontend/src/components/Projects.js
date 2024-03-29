import React from "react";
import { Link } from "react-router-dom";

const ItemProject = ({ project, users, deleteProject }) => {

    function changeUsers(user_proj) {
        let us = users.find(item => item.id === user_proj.id)
        us = us.username + ', '
        return us
    }
    console.log(project)
    let usersProject = project.users.map(changeUsers)


    return (
        <tbody>
            <tr>
                <td>
                    <Link to={`${project.id}`}> {project.id}</Link>
                </td>
                <td>
                    {project.name}
                </td>
                <td>
                    {project.url}
                </td>
                <td>
                    {usersProject}
                </td>
                <td>
                    <button type="button" onClick={() => deleteProject(project.id)}> Delete </button>
                </td>
            </tr>
        </tbody>


    )
}

const Projects = ({ projects, users, deleteProject }) => {
    return (
        <table className="tableComponents">
            <thead>
                <tr>
                    <th>
                        Id Project
                    </th>
                    <th>
                        Project Name
                    </th>
                    <th>
                        Project URL
                    </th>
                    <th>
                        Project Users
                    </th>
                </tr>
            </thead>


            {projects.map((item) => <ItemProject project={item} users={users} deleteProject={deleteProject} />)}
            <Link to="createproject"> Create </Link>

        </table>
    )
}

export default Projects;