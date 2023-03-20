import React, {useState} from "react";

function App() {

    const [likes, setLikes] = useState(5)
    const [value, setValue] = useState('')

    function increment() {
        setLikes(likes + 1)
    }

    function decrement() {
        setLikes(likes - 1)
    }


  return (
    <div className="App">
        <h1>{likes}</h1>
        <h1>{value}</h1>
        <input onChange={event => setValue(event.target.value)}/>
        <button onClick={increment}>Увеличиить</button>
        <button onClick={decrement}>Уменьшить</button>
    </div>
  );
}

export default App;
