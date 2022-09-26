# React講座(基礎編)のメモ

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

## コンポーネントの状態管理
Hooks:コンポーネント内で状態を管理する, ライフサイクルを扱う機能のこと. Reactコンポーネント内の値を書き換えたいときがある. JSではコンポーネント内のDOMを直接書き換えていたが, Reactではstateを用いることでこれらを行う. Reactコンポーネントが再レンダリングするタイミングはstateが変更されたとき, もしくはpropsが変更されたときである. 

## useStateの使い方
まず次のようにuseStateによるstateを宣言する. 
```jsx
const [state, setState] = useState(initialState)
// state: 現在の状態
// setState: 更新関数
// initialState: 初期値
```

stateの更新は次のように行う.
```jsx
setState(newState)
// newState: 新しい状態
```

useStateの使い方の例を次に示す.
```jsx
// App.js
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
        </div>
    );
}

export default App;
```

```jsx
// Article.js
import { useState } from "react";

const Article = (props) => {
    const [isPublished, setIsPublished] = useState(false)
    console.log(isPublished)
    return (
        <div>
            <h2>{props.title}</h2> {/* propsから値を受け取る */}
            <p>{props.authorName}</p>
            <p>{props.content}</p> {/* propsから値を受け取る */}
            <button onClick={() => setIsPublished(true)}>公開</button>
        </div>
    );
};

export default Article; /* 子コンポーネントをexportできるようにする */
```

propsとstateの違い
- props : 親コンポーネントから子コンポーネントに渡されるもの
- state : コンポーネントの中で制御・処理を行うためのもの

## stateをpropsに渡す
次のような例を通してstateをpropsに渡す方法を説明する. まずuseStateとその関数を設定する. 
ここではpublishArticleという関数を定義する. そして<PublishButton isPublished={isPublished} onClick={publishArticle} />でPublishButtonを実装する. propsにはisPublishedとしてstateのisPublished, ボタンクリック時の動作としてpublishArticle関数を渡す. PublishButton関数ではボタンがクリックされたらprops.onClick, すなわちpublishArticle関数を実行する. また表示部ではprops.isPublished.toString(), すなわちisPublishedを文字列化した値を表示する.
```jsx
// Article.jsx
import { useState } from "react";
import {Title, Content, PublishButton} from "./index";

const Article = (props) => {
    const [isPublished, setIsPublished] = useState(false)
    // 公開状態をtrueにする関数
    const publishArticle = () => {
        setIsPublished(true) // 更新関数をtrueにする
    }

    return (
        <div>
            <Title title={props.title} />
            <p>{props.authorName}</p>
            <Content content={props.content}/>
            <PublishButton isPublished={isPublished} onClick={publishArticle} />
        </div>
    );
};

export default Article; /* 子コンポーネントをexportできるようにする */
```

```jsx
// PublishButton.jsx
const PublishButton = (props) => {
    return (
        <button onClick={() => props.onClick()}>
            公開状態: {props.isPublished.toString()}
        </button>
    )
};

export default PublishButton;
```

## useStateの実用的な使い方
引数を渡してstateを更新したい時がある. このような場合は次のようにonChange関数を用いて状態の更新を行う. TextInput関数はhandleName関数を持っており, eventの値をsetName関数に与えてstateを更新する処理を行う. eventはinput, すなわちテキストボックスの入力のonChangeで受け取る. 
onChangeはその変数の中身が変更されたことをトリガーにeventをhandleName関数に与える. これによってnameが更新され, inputタグのnameが更新される.
```jsx
// App.js
import React from "react";
import {Article, TextInput} from "./components/index"

function App(){
  const authorName = "chama" // 変数宣言
    return (
      <TextInput />
    );
}
```

export default App;

```jsx
// TextInput.js
import React, {useState} from "react";

const TextInput = () => {
    const[name, setName] = useState("")

    const handleName = (event) => {
        console.log(event.target.value)
        setName(event.target.value)
    }

    return (
        <input onChange = {(event) => handleName(event)}
        type={"text"}
        value={name}
        />
    );
};

export default TextInput;
```

次にprevStateについて説明する. これは特殊は変数で, 更新前のstateの値を持つ. これを用いて例えばカウンターを作ることができる. カウンターの例を次に示す. setCount(prevState => prevState+1)の部分が, setCount(count+1)ではダメなのかという疑問があるが, countの処理は非同期であるためバグる可能性がある. だから更新関数でちゃんと更新したほうがいい.
```jsx
// Counter.jsx
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
```

```jsx
// App.js
import React from "react";
import {TextInput, Counter} from "./components/index"

function App(){
    return (
      <div>
      <TextInput />
      <Counter />
      </div>
    );
}

export default App;
```

## ライフサイクル
ライフサイクルはコンポーネントが生まれてから破棄されるまでの時間の流れのことを表す. ライフサイクルを使うと時点に応じた処理を実行できる. 現在はuseEffectを用いてライフサイクルを表現している.   
ライフサイクルにはMountin, Updating, Unmountingの3種類のライフサイクルがある. 
- Mounting : コンポーネントが生まれる期間(初めにページが描画されるまでの期間)
- Updating : コンポーネントが変更される期間(ページに変更が生じる期間)
- Unmounting : コンポーネントが破棄される期間(別のページに移動, そのコンポーネントが不必要になる期間)

Mountingでは初期化が行われる. またコンストラクタが呼び出されれて初期値を設定するような処理が実行される. 次に初回のレンダリングが行われる. その後にマウント後の処理が行われる. Updatingではレンダリングと更新後の処理が行われる. Unmountingではアンマウント前の処理が行われ, コンポーネントが消滅する.  
関数コンポーネントではuseEffectという副作用フックを用いて処理を行う. 副作用とはレンダリングのたびに引き起こされる処理のことである. ここでは例としてCounter.jsxにuseEffectを加えてみる. これを実行すると, カウントアップ/ダウンが行われるたびにレンダリングが実行され, useEffectのconsole.logが実行される.

```jsx
import React, {useState, useEffect} from "react";

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

    useEffect( () => {
        console.log("Current count is...", count)
    })

    return (
        <div>
            <p>Current Count: {count}</p>
            <button onClick={countUp}>up</button>
            <button onClick={countDown}>down</button>
        </div>
    );
};

export default Counter;
```

useEffectは第二引数depsで与える配列によって実行するタイミングを制御することができる. 第二引数で与える配列と実行タイミングの例を次に示す.
```jsx
// レンダリングのたびに実行
useEffect( () => {
    console.log("Current count is...", count)
})

// 初回レンダリング後のみ実行
useEffect( () => {
    console.log("Current count is...", count)
}, [])

// triggerが実行されるたびに実行
useEffect( () => {
    console.log("Current count is...", count)
}, [trigger])

// trigger1またはtrigger2が実行されるたびに実行
useEffect( () => {
    console.log("Current count is...", count)
}, [trigger1, trigger2])
```

次にクリーンアップについて説明する. ToggleButton.jsxにクリーンアップを加えた例を次に示す. この例ではまず最初open=Falseで処理が始まる. ボタンがクリックされるとまずクリーンアップの処理が行われ, Unsubscribe database!が表示される. 次にopen=TrueとなりSubscribe database...が表示される. もう一度ボタンをクリックするとクリーンアップが実行され, open=Falseとなる.
```jsx
// ToggleButton.jsx
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
```

## useEffectの実用的な使い方
useEffectはAPIやデータベースから非同期通信でデータを取得(fetch)することに用いる.
特定の値が変わったらデータを再取得(fetch)する. ここではGitHubのAPIからユーザーデータを取得してみる. fetch APIの核心部分を次に示す. まずfetchで非同期にAPIをたたく. たたいた結果が帰ってきたら(.then)レスポンスrepをJSON形式にする. そしてJSONのdataを表示する. またエラーが発生した場合はcatchメソッドでエラー対処する.
```jsx
fetch("https://api.github.com/users/yudai0731")
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })
    .catch(error => {
        console.error(error)
    })
```

これを用いてGitHubにidを問い合わせて名前を表示するアプリを作ってみる. バッククオーテーションで加工とjsの変数を埋め込むことができる. useEffectを用いることでIDがボタンでランダムに変更されるとAPIから名前を取得して表示し, ランダムで変更がされないときはそのままの状態にするようにできる(useEffectの第二引数が重要な役割).
```jsx
// App.js
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
```