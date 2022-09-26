import React, {useState, useEffect} from "react";

const Counter = () => {
    const [count, setCount] = useState(0)
    const [count2, setCount2] = useState(0)
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

    const count2Up = () =>{
        /* アロー演算
        func (a){ return a+1}
        は次と同義
        a => a+1
        すなわちアロー演算の左の式が引数, 右の式が返り値を表す無名関数となる
        */
        setCount2(prevState => prevState+1)
    }
    const count2Down = () =>{
        setCount2(prevState => prevState-1)
    }

    useEffect( () => {
        console.log("Current count is...", count)
    }, [count, count2]) // countが変わったときのみlogを出す

    return (
        <div>
            <p>Current Count: {count}</p>
            <p>Current Count2: {count2}</p>
            <button onClick={countUp}>up</button>
            <button onClick={countDown}>down</button>
            <button onClick={count2Up}>up2</button>
            <button onClick={count2Down}>down2</button>
        </div>
    );
};

export default Counter;