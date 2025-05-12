import React, { use, useState } from 'react';


const Users = ({userPromise}) => {
    const initialUsers = use(userPromise);
    const [users,setUsers] = useState(initialUsers)
    console.log(users)


    const handleAddUser = e =>{
      e.preventDefault()
      const name = e.target.name.value;
      const email = e.target.email.value;
      const user = {name,email}
      console.log(user)

      // create user in the server
      fetch('http://localhost:3000/users',{
       method:'post',
       headers:{
           'content-type': 'application/json'
       },
       body:JSON.stringify(user)
      })
      .then(res=>res.json())
      .then(data=>{
        console.log('data after post',data)
        const newUsers = [...users,data];
        setUsers(newUsers);
        e.target.reset();
      })
    }

    return (
        <div>
           <form onSubmit={handleAddUser}>
            <input name='name' type="text" />
            <br />
            <input name='email' type="email" />
            <br />
            <input type="submit" value="add user" />
           </form>

           <div>
             {
                users.map(user=> <p key={user.id}>{user.name} : {user.email}</p>)
             }
           </div>
        </div>
    );
};

export default Users;