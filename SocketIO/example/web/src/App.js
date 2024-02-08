import './App.css';
import {io} from 'socket.io-client';
import {useEffect, useState} from "react";


function App() {
    const socket = io("localhost:5000", {transports: ['websocket']});
    const [isConnected, setIsConnected] = useState(socket.connected);

    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        function onFooEvent(value) {
            console.log(value)
        }

        socket.on('connect', onConnect);
        socket.on('disconnect', onDisconnect);
        socket.on('test', onFooEvent);

        return () => {
            socket.off('connect', onConnect);
            socket.off('disconnect', onDisconnect);
            socket.off('test', onFooEvent);
        };
    }, []);

    return (
        <div className="App">
            <p>
                { isConnected.toString() }
            </p>
            <button onClick={() => socket.timeout(5000).emit("msg", {param: 1, test: true})}>test</button>
        </div>
    );
}

export default App;
