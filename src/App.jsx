
import HomePage from "./routes/homePage/homePage"
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./routes/layout/layout";
import ListPage from "./routes/listPage/listPage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />
        },
        {
          path: "/list",
          element: <ListPage />
        }

      ]
    }
  ]);

  return (

    <RouterProvider router={router} />
  );
}

export default App