// Router
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Toaster
import { Toaster } from "react-hot-toast";

// Pages
import Home from "./pages/Home";
import Link from "./pages/Link";
import Taken from "./pages/Taken";
import Reading from "./pages/Reading";
import Writing from "./pages/Writing";
import Listening from "./pages/Listening";
import Delivering from "./pages/Delivering";

// Layouts
import MainLayout from "./layouts/MainLayout";
import TestLayout from "./layouts/TestLayout";

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

        {/* Taken */}
        <Route path="taken" element={<Taken />} />

        {/* Link */}
        <Route path="link/:linkId" element={<Link />} />
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
