# React講座のメモ

## 目標
- Reactの基礎知識を得る
- Hooksを用いた記法で開発をすることができる
- Reactで簡単なチャットアプリを作ることができる

## 基礎知識
ReactはFacebook社が開発したUiライブラリで現在はOSS. UIを作るためのコンポーネント(見た目+機能)という概念が特徴的で, コンポーネントを組み合わせてwebの画面を作っていく.  
従来のHTMLでは, HTML(ツリー構造のドキュメント)を画面に描画する. ツリー構造を変更するときはDocument Object Model(DOM)からアクセスを行う. ただしDOMを直接変更してHTMLを再描画する処理はコストが高いという問題点がある. Reactでは仮想DOMと呼ばれる仕組みを用いてこの問題点を解決している. 仮想DOMでは, ブラウザのDOMツリーはJavaScriptのオブジェクトとして扱うことでブラウザに負荷をかけずにJavaScriptエンジンのメモリを使うことができ, 効率の良い再描画(レンダリング)を行うことがこのような仕組みの目標である. またDOMの状態をJavaScriptで管理することができる(=コンポーネント). レンダリングには差分描画という仕組みが用いられている. 従来のHTMLの場合, ツリー構造の1箇所が更新されると全体をレンダリングしていたが, 仮想DOMを用いると更新された箇所に関係する箇所のみを書き換えることでレンダリングの処理を軽量化している. 

## JSXの記法
JSXはJavaScriptの拡張言語を表す. HTMLライクな記法でJavaScriptの構文が使える, JSXは最終的にReact要素を生成するという特徴がある. JSXはコンパイル時にJSX記法で書いたものをReact.createElementの式に変換してReact要素を生成する. JSXの基本文法を次に示す. JSは基本的にキャメルケース(ex. className)で記述する. また変数を{value}のようにすることで出力できる. また最上位のコンポーネントは1つでないといけない(並列できない). このため最上位に<React.Fragment>や<>, <div>で囲む(どれも出力上はなかったことになる).
```jsx
import React from "react"; // Reactライブラリをインポートする(現在はなくても動く)
consta BlueButton = () => {
    return (
        <button className={"btn-blue"}>
            Click me!
        </button>
    )
}
```

## 環境構築
もっとも簡単にReactの環境を構築する方法はreact-create-appコマンドである. これによってシングルページアプリケーション(SPA):ページの再読み込みがない軽量なアプリケーションを作成できる. create-react-appに必要な環境は, Node.js 10.16以上, npm 5.6以上である. まず次に示すnpxコマンド(ネットワーク上のnpmコマンドを実行するもの)を実行する.
```
npx create-react-app [フォルダ名]
```

コマンドを実行すると開発環境が構築される. 作成されたディレクトリに移動するとreadme, src,  publicのディレクトリがあることがわかる. srcは開発用のファイルが格納される. ReactコンポーネントのJSXはsrcに配置する. puublicは静的ファイルやhtml, imageファイルを配置する. また後にbuildというディレクトリを用いる. buildは本番用のファイルが格納される. npm run buildコマンドで生成される. 

## 基本的なスクリプト
ここでは基本的なスクリプトとして3つのスクリプトについて説明する.
まず次に示すnpm startコマンドを用いるとローカルサーバーを起動してReactアプリを確認できる. これはホットリロード対応であるからアプリ実行中にソースコードが更新されると実行中のアプリも更新される. アプリはlocalhost:3000で起動する.
```
npm start
```

次にnpm run buildコマンドについて説明する. このコマンドを実行すると本番用のファイルを生成してbuildディレクトリに出力する. srcとpublicのファイルを1つにまとめるバンドルと呼ばれる操作を行う.
```
npm run build
```

最後にnpm run ejectコマンドについて説明する. このコマンドはトランスパイラ(BabelやWebpack)の設定を変更したいときに用いるコマンドである.
```
npm run eject
```

なおこれらのコマンドはpackage.jsonに記述されている. 

## コンポーネントの基本
コンポーネントとは何か? →見た目の機能を持つUI部品でこれを組み合わせてページを作る. コンポーネントは大きく分けるとClass ComponentとFunctional Componentの2つがあり後者が主流になっている. 1つのコンポーネントは1つのファイルに記述する.  
ファイル名は大文字始まりで, 親コンポーネント, 子コンポーネントという概念がある. これは親コンポーネントが子コンポーネントをimportし, 子コンポーネントではコンポーネントをexportできるように記述してあげる. 親コンポーネント(App.jsx)と子コンポーネント(components/Article.jsx)の例を次に示す.

```jsx
{/* 親コンポーネント */}
import Article from "./components/Article.jsx" /* 子コンポーネントをインポート */

function App(){
    return (
        <div>
            <Article />  {/* 子コンポーネントを呼び出す */}
        </div>
    );
}

export default App;
```

```jsx
/* 子コンポーネント　*/
const Article = () => {
    return <h2>こんにちわ</h2>
};

export default Article; /* 子コンポーネントをexportできるようにする */
```

コンポーネントを扱ううえで重要なpropsについて説明する. 親コンポーネントから子コンポーネントにデータを受け渡したいときにpropsを用いる. propsの例を次に示す. この例ではArticleコンポーネントが引数としてpropsを受け取り, props.tileとprops.contentの情報が親コンポーネントから受け渡される. 親コンポーネントでは子コンポーネントを呼び出すときにtitleとcontentを指定する. propsで渡せるデータについては文字列, 数値, 真理値, 変数など何でもよい. 記法としては{value}のように中括弧で囲って記述するが文字列は"test"のようにそのまま渡してもよい.

```jsx
/* 親コンポーネント */
import Article from "./components/Article.jsx" /* 子コンポーネントをインポート */

function App(){
    return (
        <div>
            <Article 
                title={"ゼロから学ぶディープラーニング"} /* props.titleの指定 */
                content={"ニューラルネットワークの構造について"}　/* props.contentの指定 */
            />
        </div>
    );
}

export default App;
```

```jsx
{/* 子コンポーネント　*/}
const Article = (props) => {
    return (
        <div>
            <h2>{props.title}</h2> {/* propsから値を受け取る */}
            <p>{props.content}</p> {/* propsから値を受け取る */}
        </div>
    );
};

export default Article; /* 子コンポーネントをexportできるようにする */
```

コンポーネントは再利用することができる. 例えば次のようにする. ここでは一つずつ値を与えているがmapメソッドを用いてさらに簡単に与えることができる.

```jsx
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
```

## JavaScriptのモジュール
モジュールとはプログラムを分割する単位で, 必要な時にimportするような仕組みを表す. モジュールは原則1モジュール1ファイルにする. Reactのコンポーネントもこの考え方を参考にしている. import, exportにはいくつか種類がある. 
- default export(名前なしexport): 推奨されているexport方法で1ファイル1exportである. 関数を宣言した後にdefault exportする方法と, 名前付き関数を宣言するときにdefault exportする方法がある.

- defaiult import : default exportしたモジュールをそのまま読みこむ. import モジュール名 from ファイルパス のように記述する.

- 名前付きexport : 1ファイルから複数モジュールをexportしたいときに用いる. 例えば次のように複数のモジュールからなるファイルがあるとき, 次のようにexportする. これによってdefaultという名前でas以下のコンポーネントがexportされる. これによって呼び出すときにdefaultでまとめてimportできる. 同時にas以下の名前で単一のモジュールだけ呼び出したいときに呼び出すことができる. エントリポイントは慣例的にcomponent/index.jsに作成する.
```jsx
export const addTax = (price) => {
    return Math.floor(price * 1.1)
}
export const getWild = () => {
    console.log("Get Wild and touch")
}

export {default as Article} from "./Article"
export {default as Content} from "./Content"
export {default as Title} from "./Title"
```

- 名前付きインポート: 1つのファイルから複数のモジュールを呼び出すとき, エントリポイントから複数のコンポーネントを読み込むときに用いる. 例を次に示す. この例ではcomponent/index.jsからContentとTitleを読み込んでいる.
```jsx
import {Content, Title} from "./index";

const Article = (props) => {
    return (
        <div>
            <Title title={props.title} />
            <Content content={props.content} />
        </div>
    );
};

export default Article;
```