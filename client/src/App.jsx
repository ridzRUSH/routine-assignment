import "./App.css";
import HomePage from "./pages/HomePage";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import AddRoutinePage from "./pages/AddRoutinePage";
import AddProduct from "./pages/AddProduct";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import RoutineAnalysis from "./pages/RoutineAnalysis";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <UserLayout />,
      children: [
        { path: "", element: <HomePage /> },
        { path: "/register", element: <RegisterPage /> },
        { path: "/login", element: <LoginPage /> },
      ],
    },
    {
      path: "/admin",
      element: <AdminLayout />,
      children: [
        { path: "addRoutine", element: <AddRoutinePage /> },
        { path: "addProduct", element: <AddProduct /> },
        { path: "routineAnalysis", element: <RoutineAnalysis /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

// fix monetring
// add mile stone  side bar with slider
// add product with side bar with slider

// admin done 🎉

// analysis pannel start
//  clone some repo
// see and impliment some dope stuffs

// client
// add a nice home page like ecommerce
