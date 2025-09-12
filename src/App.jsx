// Router
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Layouts
import MainLayout from "./layouts/MainLayout";

// Pages
import Home from "./pages/Home";
import Link from "./pages/Link";
import Reading from "./pages/Reading";
import Writing from "./pages/Writing";
import Listening from "./pages/Listening";
import TestLayout from "./layouts/TestLayout";
import { Toaster } from "react-hot-toast";
import Delivering from "./pages/Delivering";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        {/* Home */}
        <Route index element={<Home />} />

        {/* Test */}
        <Route element={<TestLayout />} path="tests/test/:testId/module/">
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

        {/* Link */}
        <Route element={<Link />} path="link/:linkId" />
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
