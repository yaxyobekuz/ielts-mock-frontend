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
import Editor from "./pages/Editor";
import Listening from "./pages/Listening";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="editor" element={<Editor />} />
        <Route
          element={<Listening />}
          path="listening/:listeningId/:partNumber/:questionNumber"
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
