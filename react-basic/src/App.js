import Article from "./components/Article.jsx"

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
            <Article 
                /* props.titleの指定 */
                title={"ラーメンの作り方入門2"}
                /* props.contentの指定 */
                content={"麺の作り方について"}
                authorName={authorName} 
            />
            <Article 
                /* props.titleの指定 */
                title={"ラーメンの作り方入門3"}
                /* props.contentの指定 */
                content={"ラーメンを完成させる"}
                authorName={authorName} 
            />
        </div>
    );
}

export default App;