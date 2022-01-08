import React from 'react'
import { useParams } from 'react-router-dom'

const TodoItem = ({item}) => {
    return (
        <tr>
            <td>{item.todo_id.id}</td>
            <td>{item.todo_id.text}</td>
            <td>{item.todo_id.created_at}</td>
            <td>{item.project_id.name}</td>
            <td>{item.user_id.username}</td>
        </tr>
    )
}


const ProjectTodoList = ({items}) => {

    let { id } = useParams();
    let filtered_items = items.filter((item) => item.user_id.id == id)
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>text</th>
                <th>created_at</th>
                <th>Категория(Проект)</th>
                <th>Чья задача</th>
            </tr>
            {filtered_items.map((item) => <TodoItem item={item} />)}
        </table>
    )
}

export default ProjectTodoList