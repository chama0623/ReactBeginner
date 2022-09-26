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