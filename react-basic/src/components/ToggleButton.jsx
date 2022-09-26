import React, {useState} from "react";
import { useEffect } from "react";

const ToggleButton = () => {
    const[open, setOpen] = useState(false)

    const toggle = () => {
        setOpen(prevState => !prevState) // 前の状況を反転させる
    }

    useEffect( () => {
        console.log("Current state is ", open)
        if(open){
            console.log("Subscribe database...")
        }
        return () => { // クリーンアップ
            console.log("Unsubscribe database!") // クリーンアップ関数
        }
    })

    return(
        // クリックトリガーでtoggle関数を実行
        // 表示部は三項演算子 条件 ? True処理:False処理
        <div>
        <button onClick={toggle}>{open ? "open":"close"}</button>
        </div>
    );
};
export default ToggleButton;