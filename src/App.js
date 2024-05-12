import logo from "./logo.svg";
import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import Products from "./Components/Products/Products";
import Categories from "./Components/Categories/Categories";
import Brands from "./Components/Brands/Brands";
import Cart from "./Components/Cart/Cart";
import Notfound from "./Components/Notfound/Notfound";
import UserContextProvider, { UserContext } from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from 'react-hot-toast';
import Profile from "./Components/Profile/Profile";
import { Provider } from "react-redux";
import { store } from "./Redux/Store";
import Address from './Components/Address/Address';
import Order from "./Components/Order/Order";


let routers = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index : true, element: <ProtectedRoute><Home/></ProtectedRoute>  },
      { path: "login", element: <Login/> },
      { path: "register", element: <Register /> },
      { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: "categories", element: <ProtectedRoute><Categories /></ProtectedRoute>},
      { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
      { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute>},
      { path: "profile", element: <ProtectedRoute><Profile /></ProtectedRoute>},
      { path: "address", element: <ProtectedRoute><Address /></ProtectedRoute>},
      { path: "allorders", element: <ProtectedRoute><Order /></ProtectedRoute>},
      { path: "productdetails/:id", element: <ProtectedRoute><ProductDetails /></ProtectedRoute>},
      { path: "*", element: <Notfound /> },
    ],
  },
]);



function App() {

  return <CartContextProvider>
          <UserContextProvider>
            <Provider store={store}>
              <RouterProvider router={routers}></RouterProvider>  
              <Toaster/>
            </Provider>
          </UserContextProvider>
        </CartContextProvider>
          
         
  ;
}

export default App;
