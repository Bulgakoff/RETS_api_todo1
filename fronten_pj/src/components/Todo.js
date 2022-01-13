import React from 'react'
import {Link} from "react-router-dom";


const TodoItem = ({item, deleteTodo}) => {
    return (
        <tr>
            <td><Link to={`todo/${item.id}`}>{item.id}</Link></td>
            <td>{item.text}</td>
            <td>{item.created_at}</td>
            <td>
                <button onClick={() => deleteTodo(item.id)}
                        type='button'>Delete
                </button>
            </td>
        </tr>
    )
}


const TodoList = ({items, deleteTodo}) => {
    return (
        <div>
            <table>
                <tr>
                    <th>ID</th>
                    <th>text</th>
                    <th>created_at</th>
                    <th></th>
                </tr>
                {items.map((item) => <TodoItem item={item}
                                               deleteTodo={deleteTodo}/>)}
            </table>
            <Link to='/todoes/create'>Create</Link>
        </div>
    )
}


export default TodoList