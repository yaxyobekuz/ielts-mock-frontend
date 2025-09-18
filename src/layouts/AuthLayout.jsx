// React
import { useEffect, useRef } from "react";

// Toast
import { toast } from "@/notification/toast";

// Backgrounds
import ieltsBg from "@/assets/backgrounds/ielts.jpg";

// Images
import ieltsLogo from "@/assets/icons/ielts-logo.svg";

// Hooks
import usePathSegments from "@/hooks/usePathSegments";

// Router
import { Link, Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const auth = localStorage.getItem("auth");
  if (auth) return <AuthenticatedContent />;
  else return <UnauthenticatedContent />;
};

const UnauthenticatedContent = () => {
  const contentRef = useRef(null);
  const { pathSegments } = usePathSegments();
  const isLogin = pathSegments[1] === "login";

  useEffect(() => {
    const content = contentRef.current;
    if (content) {
      content.classList.add("animate__fadeIn");

      setTimeout(() => {
        content.classList.remove("animate__fadeIn");
      }, 300);
    }
  }, [pathSegments[1]]);

  return (
    <div className="grid grid-cols-2 size-full h-screen bg-white animate__animated animate__fadeIn">
      {/* Image */}
      <img
        width={960}
        height={945}
        src={ieltsBg}
        alt="IELTS with whiteblue background"
        className="w-full h-screen bg-[#daeef9] object-cover brightness-90"
      />

      <div className="flex flex-col items-center justify-between gap-8 w-full p-8 max-h-full overflow-y-auto">
        {/* Logo */}
        <img
          height={40}
          width={122.5}
          src={ieltsLogo}
          alt="IELTS logo svg"
          className="w-[122.5px] h-9"
        />

        {/* Main */}
        <div className="text-center">
          {/* Title */}
          <h1 className="mb-3 text-2xl font-semibold">
            {isLogin ? (
              <div className="animate__animated animate__fadeIn">
                Hisobga kirish
              </div>
            ) : (
              <span className="inline-block animate__animated animate__fadeIn">
                Yangi hisob yaratish
              </span>
            )}
          </h1>

          {/* Description */}
          <div className="mb-3 text-gray-500">
            {isLogin ? (
              <p className="not-italic animate__animated animate__fadeIn">
                Qaytganingiz bilan! Hisobingizga kirish uchun <br /> Iltimos
                ma'lumotlaringizni kiriting
              </p>
            ) : (
              <span className="inline-block animate__animated animate__fadeIn">
                Yangi hisob yaratish uchun iltimos barcha <br />
                ma'lumotlaringizni kiriting
              </span>
            )}
          </div>

          {/* Navlinks */}
          <nav className="mb-5 w-full">
            <ul className="flex relative max-w-max bg-gray-50 p-1 rounded-xl mx-auto">
              <Link to="/auth/login" className="btn w-44 h-10 z-10">
                Hisobga kirish
              </Link>

              <Link to="/auth/register" className="btn w-44 h-10 z-10">
                Hisob yaratish
              </Link>

              {/* Active overlay */}
              <div
                className={`${
                  isLogin ? "left-1" : "left-1/2"
                } absolute z-0 btn w-44 h-10 bg-white shadow-sm transition-[left] duration-300 `}
              />
            </ul>
          </nav>

          {/* Content */}
          <div ref={contentRef} className="w-[360px] animate__animated">
            <Outlet />
          </div>
        </div>

        {/* Bottom */}
        <p className="max-w-lg text-center text-gray-500">
          © IELTS 2025 - Barcha huquqlar himoyalangan.
        </p>
      </div>
    </div>
  );
};

const AuthenticatedContent = () => {
  useEffect(() => toast("Siz allaqachon hisobingizga kirgansiz"), []);
  return <Navigate to="/" />;
};

export default AuthLayout;
