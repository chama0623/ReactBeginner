import React, { useState, useEffect } from "react";
// import {TextInput, Counter, ToggleButton} from "./components/index"

function App(){
    const [name, setName] = useState("")
    const [id, setId] = useState("yudai0731")
    const ids = ["yudai0731", "gaearon", "aws", "google", "facebook"]
    const getRandomId = () =>{
      const _id = ids[Math.floor(Math.random()*ids.length)]
      setId(_id)
    }

    useEffect( () => {
      fetch(`https://api.github.com/users/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setName(data.name)
      })
      .catch(error => {
        console.error(error)
      })
    }, [id])
    return (
      <div>
        <p>{id}の名前は{name}です.</p>
        <button onClick={getRandomId}>IDをランダムに変更</button>
      </div>
    );
}

export default App;