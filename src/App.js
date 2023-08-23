import React, {useEffect,useState} from "react";
import axios from "axios";

const App = ()  => {
    const [users, setUsers] = useState([])
    const [name,setName] = useState([])
    const [edit,setEdit] = useState(null)

    useEffect(() => {
        axios('https://64e2ef8fbac46e480e77edf1.mockapi.io/users/users')
            .then(({data}) => setUsers(data))
    }, [])

    const handleChange = (e,user) => {
        const newData = {...user, hired: e.target.checked}
        axios.put(`https://64e2ef8fbac46e480e77edf1.mockapi.io/users/users/${users.id}`,newData)
            .then(({data}) => {
                setUsers(users.map(user => user.id === data.id ? data : user))
            })
    }
    const handleDelete = (user) =>{
    axios.delete(`https://64e2ef8fbac46e480e77edf1.mockapi.io/users/users/${user.id}`)
        .then(({data}) => {
            setUsers(users.filter(user => user.id !== data.id))
        })
    }
    const handleAddUser = (e) => {
        e.preventDefault()
        if (edit) {
            const newData = {...edit,name}
            axios.put(`https://64e2ef8fbac46e480e77edf1.mockapi.io/users/users/${edit.id}`, newData)
                .then(({data}) => {
                    setUsers(users.map(user => user.id === data.id ? data : user))
                    setName('')
                    setEdit(null)
                })
        }else {
            axios.post('https://64e2ef8fbac46e480e77edf1.mockapi.io/users/users',{name})
                .then(({data}) => {
                    setUsers([...users,data])
                    setName('')
                })
        }
    }
    const handleOther = (user) => {
        setName(user.name)
        setName(user)
    }

    return (
        <div className="container">
           <form onSubmit={handleAddUser}>
               <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      type='text'
               />
               <button type={'submit'}>
                   {edit ? 'edit true' : 'Add user'}
               </button>
           </form>
            {
                users.map(user => {
                    return(
                        <div key={user.id} className={'user-wrapper'}>
                            <h2>{user.name}</h2>
                            <p>{user.email}</p>
                            <input type='checkbox'
                                   onChange={(e) => handleChange(e,user)}  checked={user.hired}
                            />
                            <button onClick={() => handleDelete(user)}>Delete</button>
                            <button onClick={() => handleOther(user)}>Edit</button>
                        </div>
                        )
                })
            }
        </div>
    );
}

export default App;
