import React from 'react'


const PtuItem = ({item}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.project_id}</td>
            <td>{item.todo_id}</td>
            <td>{item.user_id}</td>
        </tr>
    )
}


const PtuList = ({items}) => {
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>project_id</th>
                <th>todo_id</th>
                <th>user_id</th>
            </tr>
            {items.map((item) => <PtuItem item={item}/>)}
        </table>
    )
}


export default PtuList