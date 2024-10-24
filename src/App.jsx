import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Authentication from './pages/Authentication.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import Edit from './pages/Edit.jsx';

import { AuthContextProvider } from './contexts/AuthContext.jsx';

function App() {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Authentication />,
      children: [
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Register />,
        }
      ]
    },
    {
      path: "/home",
      element: <Home />,
      children: [
        {
          path: "edit",
          element: <Edit />,
        }
      ]
    }
  ]);

  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;