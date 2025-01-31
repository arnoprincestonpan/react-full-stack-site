import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ArticleListPage from './pages/ArticleListPage';
import AboutPage from './pages/AboutPage';
import ArticlePage, { loader as articleLoader} from './pages/ArticlePage';
import Layout from './pages/Layout';
import NotFoundPage from './pages/NotFoundPage';

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
      loader: articleLoader,
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
