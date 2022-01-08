import React from 'react'


const PtuItem = ({item}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.project_id.name}</td>
            <td>{item.todo_id.text}</td>
            <td>{item.user_id.username}</td>
        </tr>
    )
}


const PtuList = ({items}) => {
    return (
        <table>
            <h1>общий список :</h1>
            <tr>
                <th>ID</th>
                <th>Проект</th>
                <th>Задача</th>
                <th>Кто выполняет</th>
            </tr>
            {items.map((item) => <PtuItem item={item}/>)}
        </table>
    )
}


export default PtuList