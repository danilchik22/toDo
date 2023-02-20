import React from "react";
import { useParams } from "react-router-dom";

const ProjectDetail = ({ projects, users }) => {
    let id = useParams().id;
    console.log(id);
    console.log(projects);
    let proj = projects.find((item) => {
        return item.id == id
    })

    return (
        <div className="projectDetail">
            <p className="nameProject"> Имя проекта: <b> {proj.name} </b> </p>
            <p className="nameProject"> URL проекта: <b> {proj.url} </b> </p>
            <p className="nameProject"> Пользователи у проекта: <b> {proj.users} </b> </p>
        </div>


    )
}

export default ProjectDetail;