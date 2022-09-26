const Article = (props) => {
    return (
        <div>
            <h2>{props.title}</h2> {/* propsから値を受け取る */}
            <p>{props.authorName}</p>
            <p>{props.content}</p> {/* propsから値を受け取る */}
        </div>
    );
};

export default Article; /* 子コンポーネントをexportできるようにする */