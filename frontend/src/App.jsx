import { Route, Routes } from "react-router";
import AuthLayout from "./layouts/AuthLayout";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Authentication from "./components/Authentication";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { verifyAuth } from "./slice/authSlice";
import Todo from "./components/Todo";
import Blog from "./components/Blog";

export default function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyAuth());
  }, [dispatch]);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Authentication isAuthenticated={isAuthenticated}>
            <Home />
          </Authentication>
        }
      />
      <Route
        path="/todo"
        element={
          <Authentication isAuthenticated={isAuthenticated}>
            <Todo />
          </Authentication>
        }
      />
      <Route
        path="/blog"
        element={
          <Authentication isAuthenticated={isAuthenticated}>
            <Blog />
          </Authentication>
        }
      />
      <Route
        path="/auth"
        element={
          <Authentication isAuthenticated={isAuthenticated}>
            <AuthLayout />
          </Authentication>
        }
      >
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
}
