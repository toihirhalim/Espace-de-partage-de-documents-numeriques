import React, { useState } from 'react'
import graphQlApi from './graphQlApi'

export default function Acceuil() {
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState();
    const [username, setUsername] = useState("");

    const handleClick = async e => {
        e.preventDefault();
        let query = `
            query {
                users{
                    id,
                    username,
                    age
                }
            }
        `
        const data = await graphQlApi(query)

        if (data.users) {
            setUsers(data.users)
        }

    }

    const getUser = async e => {
        e.preventDefault();
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
        const data = await graphQlApi(query);
        if (data.user) {
            setUser(data.user)
        }
    }


    return (
        <div>
            <h2>acceuil</h2>

            <div style={{ display: 'flex', width: '100%' }}>

                <div style={{ width: '50%' }}>
                    <button onClick={handleClick}>get users</button>
                    {users.map(user => {
                        return (
                            <p key={user.id}>id : {user.id} username : {user.username} age : {user.age}</p>
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
                                <h5>Todos : </h5>
                                <ul>
                                    {
                                        user.todos.map(todo => {
                                            return (

                                                <p key={todo.id}>
                                                    <li>
                                                        todo name: {todo.name} done :
                                                            <input type="checkbox" defaultChecked={todo.done} />
                                                    </li>
                                                </p>

                                            )
                                        })
                                    }
                                </ul>
                            </div>
                        )
                    }
                </div>
            </div>

        </div>
    )
}
