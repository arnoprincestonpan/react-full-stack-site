import { useParams, useLoaderData} from 'react-router-dom';
import articles from '../article-content';
import axios from 'axios';

export default function ArticlePage() {
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

export  async function loader({params}) {
  const response = await axios.get("/api/articles/" + params.name);
  const { upvotes, comments} = response.data;
  return { upvotes, comments };
  // avoid copying back-end URL, you have to make it think it's the same server in localhost
  // it will be the same server when hosted
  // you want to return the upvotes and comments; you can get them as an object (this way you can use them in <ArticlePage/>)
}

