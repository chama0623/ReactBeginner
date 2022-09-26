import React from "react";
import {Article} from "./components/index"

function App(){
  const authorName = "chama" // 変数宣言
    return (
        <div>
            <Article 
                /* props.titleの指定 */
                title={"ラーメンの作り方入門1"}
                /* props.contentの指定 */
                content={"スープの作り方について"}
                authorName={authorName} 
            />
        </div>
    );
}

export default App;