// Lottie
import Lottie from "lottie-react";

// React
import { useEffect } from "react";

// Hooks
import useStore from "@/hooks/useStore";

// Auth api
import { authApi } from "@/api/auth.api";

// Router
import { Link, Outlet, useLocation } from "react-router-dom";

// Components
import MainBgLoader from "@/components/loaders/MainBgLoader";

// Animations
import duckShrugging from "@/assets/animated/duck-shrugging.json";

const MainLayout = () => {
  const location = useLocation();
  const auth = localStorage.getItem("auth");

  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (auth) return <AuthenticatedContent />;
  else return <UnauthenticatedContent />;
};

const AuthenticatedContent = () => {
  const { getData, updateProperty } = useStore("user");
  const { isLoading, error, data } = getData();

  const loadProfile = () => {
    updateProperty("error", null);
    updateProperty("isLoading", true);

    authApi
      .profile()
      .then(({ user, code }) => {
        if (code !== "profileSuccess") throw new Error();
        updateProperty("data", user);
      })
      .catch((err) => updateProperty("error", err))
      .finally(() => updateProperty("isLoading", false));
  };

  // Clear error from store
  const clearError = () => {
    setTimeout(() => updateProperty("error", null), 0);
  };

  // Load user profile
  useEffect(() => {
    isLoading && loadProfile();
  }, []);

  // Eror & Loader content
  if (isLoading || error) {
    return (
      <MainBgLoader
        error={error}
        clearError={clearError}
        onButtonClick={loadProfile}
      />
    );
  }

  // Content
  return (
    <div className="flex flex-col min-h-screen">
      <Outlet />
    </div>
  );
};

const UnauthenticatedContent = () => {
  const isHomepage = location.pathname === "/";

  if (!isHomepage) {
    return (
      <div className="flex items-center justify-center w-full min-h-screen bg-gray-50">
        <div className="flex items-center gap-8 px-5">
          {/* Duck */}
          <Lottie animationData={duckShrugging} className="size-40" />

          <div className="space-y-3.5">
            {/* Title */}
            <h1 className="text-2xl font-semibold">Hisobingizga kirmagansiz</h1>

            {/* Description */}
            <p className="text-lg text-gray-500">
              Agar hisobingiz mavjud bo'lsa unga kiring.
              <br />
              Aksincha bo'lsa yangi hisob yarating.
            </p>

            {/* Auth links */}
            <div className="flex items-center gap-3.5">
              <Link
                title="Login"
                to="/auth/login"
                className="btn bg-violet-500 text-white hover:bg-violet-600"
              >
                Hisobga kirish
              </Link>

              <Link
                title="Register"
                to="/auth/register"
                className="btn bg-blue-500 text-white hover:bg-blue-600"
              >
                Hisob yaratish
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Outlet />
    </div>
  );
};

export default MainLayout;
