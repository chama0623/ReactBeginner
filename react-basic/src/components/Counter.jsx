import React, {useState} from "react";

const Counter = () => {
    const [count, setCount] = useState(0)
    const countUp = () =>{
        /* アロー演算
        func (a){ return a+1}
        は次と同義
        a => a+1
        すなわちアロー演算の左の式が引数, 右の式が返り値を表す無名関数となる
        */
        setCount(prevState => prevState+1)
    }
    const countDown = () =>{
        setCount(prevState => prevState-1)
    }

    return (
        <div>
            <p>Current Count: {count}</p>
            <button onClick={countUp}>up</button>
            <button onClick={countDown}>down</button>
        </div>
    );
};

export default Counter;