import React from 'react'
import { useParams } from 'react-router-dom'

const UserItem = ({item}) => {
    return (
        <tr>
            <td>{item.user_id.id}</td>
            <td>{item.user_id.username}</td>
            <td>{item.user_id.date_joined}</td>
            <td>{item.project_id.name}</td>
        </tr>
    )
}


const ProjectUserList = ({items}) => {

    let { id } = useParams();
    let filtered_items = items.filter((item) => item.project_id.id == id)
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>username</th>
                <th>date_joined</th>
                <th>Категория(Проект)</th>
            </tr>
            {filtered_items.map((item) => <UserItem item={item} />)}
        </table>
    )
}

export default ProjectUserList