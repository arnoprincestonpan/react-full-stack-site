import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ArticleListPage from './pages/ArticleListPage';
import AboutPage from './pages/AboutPage';
import ArticlePage from './pages/ArticlePage';
import Layout from './pages/Layout';
import NotFoundPage from './pages/NotFoundPage';
import axios from 'axios';

const routes = [{
  path: '/',
  element: <Layout/>,
  errorElement: <NotFoundPage/>,
  children: [
    {
      path:'/',
      element: <HomePage/>
    },
    {
      path:'/about',
      element: <AboutPage/>
    },
    {
      path:'/articles',
      element: <ArticleListPage/>
    },
    {
      path:'/articles/:name/', // URL parameter (you can call :name anything) -> catches all sub-routes of /articles/...
      element: <ArticlePage/>,
      loader: async function() {
        await axios.get("/api/articles/learn-node");
        const { upvotes, comments} = response.data;
        return { upvotes, comments };
        // avoid copying back-end URL, you have to make it think it's the same server in localhost
        // it will be the same server when hosted
        // you want to return the upvotes and comments; you can get them as an object (this way you can use them in <ArticlePage/>)
      }
    }
  ]
}]

const router = createBrowserRouter(routes);


function App() {
  return (
    <>
      {/* <NavBar/> it's not going to work because you need it in RouterProvider*/}
      <RouterProvider router={router} />
    </>
  );
}

export default App
