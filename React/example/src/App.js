import './App.css';
const componentStyle = {
    background: "red"
}
function Component({name, onClick}) {
    return (
        <button style={componentStyle} onClick={onClick}>{name}</button>
    );
}

function App() {
    return (
        <div>
            <h1>Hello</h1>
            <Component name={"MAMA"} onClick={() => alert('PAPA')}/>
        </div>
    );
}
export default App;
