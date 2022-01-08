import React from 'react'
import { useParams } from 'react-router-dom'

const ProjectItem = ({item}) => {
    return (
        <tr>
            <td>{item.project_id.id}</td>
            <td>{item.project_id.name}</td>
            <td>{item.user_id.username}</td>
        </tr>
    )
}


const TodoIdProjectList = ({items}) => {

    let { id } = useParams();
    let filtered_items = items.filter((item) => item.todo_id.id == id)
    return (
        <table>
            <h1>список Проектов:</h1>
            <tr>
                <th>ID</th>
                <th>Название проекта</th>
                <th>Чья задача</th>
            </tr>
            {filtered_items.map((item) => <ProjectItem item={item} />)}
        </table>
    )
}

export default TodoIdProjectList