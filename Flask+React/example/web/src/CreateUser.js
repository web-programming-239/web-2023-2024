import {useState} from "react";
import url from "./utils";

function CreateUser() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div >
            <input onChange={(e) => setUsername(e.target.value)}/>
            <input onChange={(e) => setPassword(e.target.value)}/>
            <button onClick={() => {
                fetch(url("/create"), {
                    method: "POST",
                    body: JSON.stringify({username: username, password: password}),
                    headers: {'Content-Type': 'application/json'},
                }).then(console.log)
            }}>send</button>
        </div>
    );
}

export default CreateUser;
