// Router
import {
  Route,
  Outlet,
  Navigate,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

// Toaster
import { Toaster } from "react-hot-toast";

// Hoooks
import useAudioList from "./hooks/useAudioList";

// Layouts
import MainLayout from "./layouts/MainLayout";
import TestLayout from "./layouts/TestLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProfileLayout from "./layouts/ProfileLayout";

// Pages
import Home from "./pages/Home";
import Link from "./pages/Link";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Reading from "./pages/Reading";
import Writing from "./pages/Writing";
import Tutorial from "./pages/Tutorial";
import Register from "./pages/Register";
import Listening from "./pages/Listening";
import Submission from "./pages/Submission";
import Delivering from "./pages/Delivering";
import Submissions from "./pages/Submissions";
import SubmissionDetail from "./pages/SubmissionDetail";

const App = () => {
  const { setAudioList, stopAudio, isLoading, isPlaying } = useAudioList();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<MainLayout />}>
          {/* Home */}
          <Route index element={<Home />} />

          {/* Test */}
          <Route
            path="test/:testId/"
            element={
              <TestLayout
                onStopAudio={stopAudio}
                audioPlaying={isPlaying}
                audioLoading={isLoading}
              />
            }
          >
            <Route
              element={<Reading />}
              path="reading/:partNumber/:questionNumber"
            />
            <Route
              element={<Writing />}
              path="writing/:partNumber/:questionNumber"
            />
            <Route
              path="listening/:partNumber/:questionNumber"
              element={<Listening setAudioList={setAudioList} />}
            />
            <Route
              path=":module/delivering"
              element={<Delivering onStopAudio={stopAudio} />}
            />
          </Route>

          {/* Link */}
          <Route path="link/:linkId" element={<Link />} />

          {/* Submission */}
          <Route path="submission" element={<Submission />} />

          {/* Tutorial */}
          <Route path="tutorial/:testId" element={<Tutorial />} />

          {/* Profile */}
          <Route path="profile" element={<ProfileLayout />}>
            <Route index element={<Navigate to="me" />} />
            <Route path="me" element={<Profile />} />
            <Route path="submissions" element={<Outlet />}>
              <Route index element={<Submissions />} />
              <Route
                path=":submissionId/:module?"
                element={<SubmissionDetail />}
              />
            </Route>
          </Route>
        </Route>

        {/* Auth */}
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route index element={<Navigate to="login" />} />
        </Route>
      </>
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
