import articles from "../article-content"
import {Link} from 'react-router-dom'
import ArticleList from "../ArticlesList"

export default function ArticleListPage() {
  // don't forgeting in mapping it is best to keep track of the item with key
  return (
    <>
      <h1>Articles</h1>
      <ArticleList articles={articles}/>
    </>
  )
}
