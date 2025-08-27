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
import Reading from "./pages/Reading";
import Writing from "./pages/Writing";
import Listening from "./pages/Listening";
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
        </Route>
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
