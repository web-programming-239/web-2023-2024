import {useEffect, useState} from "react";
import url from "./utils";

function Users() {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        fetch(url("/users"))
            .then(res => res.json())
            .then(res => setUsers(res))
    }, [])
    return (
        <div>
            {users.map(u => <div>username: {u.username}, password: {u.password}</div>)}
        </div>
    );
}

export default Users;
