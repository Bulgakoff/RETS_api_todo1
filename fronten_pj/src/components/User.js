import React from 'react'
import {Link} from 'react-router-dom'


const UserItem = ({item}) => {
    return (
        <tr>
            <td><Link to={`user/${item.id}`}>{item.id}</Link></td>
            <td>{item.username}</td>
            <td>{item.date_joined}</td>
        </tr>

    )
}


const UserList = ({items}) => {
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>date_joined</th>
            </tr>
            {items.map((item) => <UserItem item={item}/>)}
        </table>
    )
}

export default UserList