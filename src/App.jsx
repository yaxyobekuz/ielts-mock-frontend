// Router
import {
  Route,
  Navigate,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Toaster
import { Toaster } from "react-hot-toast";

// Pages
import Home from "./pages/Home";
import Link from "./pages/Link";
import Login from "./pages/Login";
import Reading from "./pages/Reading";
import Writing from "./pages/Writing";
import Tutorial from "./pages/Tutorial";
import Register from "./pages/Register";
import Listening from "./pages/Listening";
import Submission from "./pages/Submission";
import Delivering from "./pages/Delivering";

// Layouts
import MainLayout from "./layouts/MainLayout";
import TestLayout from "./layouts/TestLayout";
import AuthLayout from "./layouts/AuthLayout";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        {/* Home */}
        <Route index element={<Home />} />

        {/* Test */}
        <Route element={<TestLayout />} path="test/:testId/module/">
          <Route
            element={<Reading />}
            path="reading/:partNumber/:questionNumber"
          />
          <Route
            element={<Writing />}
            path="writing/:partNumber/:questionNumber"
          />
          <Route
            element={<Listening />}
            path="listening/:partNumber/:questionNumber"
          />
          <Route path=":module/delivering" element={<Delivering />} />
        </Route>

        {/* Auth */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route index element={<Navigate to="login" />} />
        </Route>

        {/* Link */}
        <Route path="link/:linkId" element={<Link />} />

        {/* Submission */}
        <Route path="submission" element={<Submission />} />

        {/* Tutorial */}
        <Route path="tutorial/:testId" element={<Tutorial />} />
      </Route>
    ),
    { future: { v7_relativeSplatPath: true } }
  );

  return (
    <>
      <RouterProvider future={{ v7_startTransition: true }} router={router} />

      {/* Toaster */}
      <Toaster />
    </>
  );
};

export default App;
