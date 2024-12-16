import HomePage from './routes/homePage/homePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout, RequireLayout } from './routes/layout/layout';
import ListPage from './routes/listPage/listPage';
import SinglePage from './routes/singlePage/singlePage';
import Login from './routes/login/login';
import Register from './routes/register/register';
import ProfilePage from './routes/profilePage/ProfilePage';
import NewPostPage from './routes/newPostPage/NewPostPage';
import ProfileUpdatePage from './routes/profileUpdatePage/ProfileUpdatePage';
import {
  ListMyOwnPostLoader,
  ListPostLoader,
  singlePostLoader,
} from './lib/loader';
function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/list',
          element: <ListPage />,
          loader: ListPostLoader,
        },
        {
          path: '/:id',
          element: <SinglePage />,
          loader: singlePostLoader,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
      ],
    },
    {
      path: '/',
      element: <RequireLayout />,
      children: [
        {
          path: '/profile',
          element: <ProfilePage />,
          loader: ListMyOwnPostLoader,
        },
        {
          path: '/profile/create-post',
          element: <NewPostPage />,
        },
        {
          path: '/profile/update',
          element: <ProfileUpdatePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
