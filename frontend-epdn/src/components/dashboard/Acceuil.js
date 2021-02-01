import React, { useState } from 'react'
//import { queryApi } from './api';

export default function Acceuil() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState();
    const [username, setUsername] = useState("");

    const handleClick = e => {
        let query = `
            query {
                users{
                    id,
                    username,
                    age
                }
            }
        `
        fetch('http://localhost:8000/', {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                query: query
            })
        })
            .then(res => res.json())
            .then(json => {
                setUsers(json.data.users)
                return json.data
            })
    }

    const getUser = e => {
        let query = `
            query {
                user(username: "` + username + `"){
                    username,
                    age,
                    todos {
                        id,
                        name,
                        done
                    }
                }
            }
        `

        fetch('http://localhost:8000/', {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                query: query
            })
        })
            .then(res => res.json())
            .then(json => {
                setUser(json.data.user)
                return json.data
            })
    }


    return (
        <div>
            <h2>acceuil</h2>

            <div style={{ display: 'flex', width: '100%' }}>

                <div style={{ width: '50%' }}>
                    <button onClick={handleClick}>get users</button>
                    {users.map(user => {
                        return (
                            <p key={user.id}>username : {user.username} age : {user.age}</p>
                        )
                    })}
                </div>

                <div style={{ width: '50%' }}>
                    <input type="text" onChange={e => setUsername(e.target.value)} />
                    <button onClick={getUser}>get user</button>

                    {
                        (user) && (
                            <div>
                                <p>username : {user.username} age : {user.age}</p>
                            todos :
                                {
                                    user.todos.map(todo => {
                                        return (
                                            <p key={todo.id}>todo name: {todo.name} done :
                                                <input type="checkbox" defaultChecked={todo.done} />
                                            </p>
                                        )
                                    })
                                }
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    )
}
