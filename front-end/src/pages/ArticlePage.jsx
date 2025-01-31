import { useParams, useLoaderData} from 'react-router-dom';
import articles from '../article-content';

function ArticlePage() {
  // const params = useParams();
  // const name = params.name;
  // object destructuring way: 
  const { name } = useParams();
  const { upvotes, comments } = useLoaderData();

  // don't forget to put a key for your prop "key={p}"

  const article = articles.find(a => a.name === name);
  return (
    <>
      <h1>{article.title}</h1>
      <p>This article has {upvotes} upvotes!</p>
      {article.content.map(p => <p key={p}>{p}</p>)}
    </>
  )
}

export default ArticlePage