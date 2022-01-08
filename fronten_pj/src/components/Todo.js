import React from 'react'
import {Link} from "react-router-dom";


const TodoItem = ({item}) => {
    return (
        <tr>
             <td><Link to={`todo/${item.id}`}>{item.id}</Link></td>
            <td>{item.text}</td>
            <td>{item.created_at}</td>
        </tr>
    )
}


const TodoList = ({items}) => {
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>text</th>
                <th>created_at</th>
            </tr>
            {items.map((item) => <TodoItem item={item} />)}
        </table>
    )
}


export default TodoList