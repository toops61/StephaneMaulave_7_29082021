import { useSelector } from "react-redux";
import ArticleCard from "./ArticleCard";

export default function BuildArticles(props) {

    let messagesFetched = [...useSelector(state => state.handleComments)];
    const user = useSelector(state => state.handleUser);

    if (messagesFetched.length > 0) {
        var arrayDom = messagesFetched.map((message,index) => {
            return (
                <div key={message.id + message.updatedAt}>
                    <ArticleCard
                        modify={message.USERS_id === user.id || user.isAdmin ? true : false}
                        messageId={index}
                        setModifiedArticle={props.setModifiedArticle}
                        setModifiedComment={props.setModifiedComment}
                    />
                </div>
            )
        });
    }
    return (
        <div>
            {arrayDom}
        </div>
    )
}