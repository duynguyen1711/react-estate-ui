import HomePage from './routes/homePage/homePage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './routes/layout/layout';
import ListPage from './routes/listPage/listPage';
import SinglePage from './routes/singlePage/singlePage';
import Login from './routes/login/login';
import Register from './routes/register/register';
import ProfilePage from './routes/profilePage/ProfilePage';
import NewPostPage from './routes/newPostPage/NewPostPage';
import ProfileUpdatePage from './routes/profileUpdatePage/ProfileUpdatePage';
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
        },
        {
          path: '/:id',
          element: <SinglePage />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/profile',
          element: <ProfilePage />,
        },
        {
          path: '/test',
          element: <NewPostPage />,
        },
        {
          path: '/testupdate',
          element: <ProfileUpdatePage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
