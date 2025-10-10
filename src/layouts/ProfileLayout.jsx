// Data
import ieltsLogo from "@/assets/icons/ielts-logo.svg";

// Router
import { Link, NavLink, Outlet } from "react-router-dom";

// Components
import ProfilePhoto from "@/components/ProfilePhoto";
import UpdateAvatarModal from "@/components/modal/UpdateAvatarModal";

// Icons
import { ArrowLeft, Book, FileCheck, LogOut, Settings } from "lucide-react";

const NavIcon = ({ Icon, className = "" }) => (
  <span className={`btn bg-gray-200/70 size-9 rounded-full p-0 ${className}`}>
    <Icon size={18} strokeWidth={1.5} />
  </span>
);

const navlinks = [
  {
    name: "Profil",
    href: "/profile/me",
    icon: <ProfilePhoto className="size-9 rounded-full text-sm" />,
  },
  {
    name: "Javoblar",
    href: "/profile/submissions",
    icon: <NavIcon Icon={Book} />,
  },
  {
    name: "Natijalar",
    href: "/profile/results",
    icon: <NavIcon Icon={FileCheck} />,
  },
  // {
  //   name: "Sozlamalar",
  //   href: "/profile/settings",
  //   icon: <NavIcon Icon={Settings} />,
  // },
];

const ProfileLayout = () => {
  const handleLogout = () => {
    if (confirm("Hisobingizdan chiqmoqchimisiz?")) {
      localStorage.removeItem("auth");
      window.location.reload();
    }
  };

  return (
    <div className="profile-layout min-h-screen">
      {/* Header */}
      <header className="bg-gray-50 py-5">
        <div className="container !max-w-7xl">
          <img
            width={96}
            height={28}
            src={ieltsLogo}
            alt="IELTS logo svg"
            className="w-24 h-7"
          />
        </div>
      </header>

      {/* Main */}
      <div className="flex gap-5 container !max-w-7xl">
        {/* Left side */}
        <aside className="shrink-0 min-w-72 mt-5 space-y-5">
          {/* Back to home */}
          <Link
            to="/"
            className="btn gap-2.5 justify-start w-full bg-gray-50 h-auto rounded-full p-2.5 hover:bg-gray-100"
          >
            <NavIcon Icon={ArrowLeft} />
            Ortga qaytish
          </Link>

          {/* Nav */}
          <nav>
            <ul className="bg-gray-50 p-1.5 space-y-1.5 rounded-4xl overflow-hidden">
              {navlinks.map(({ icon, name, href }) => (
                <li key={name}>
                  <NavLink
                    to={href}
                    className="btn gap-2.5 justify-start bg-gray-50 h-auto rounded-full p-2.5 hover:bg-gray-100"
                  >
                    {icon}
                    {name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="btn gap-2.5 justify-start w-full bg-gray-50 h-auto rounded-full p-2.5 hover:bg-gray-100"
          >
            <NavIcon Icon={LogOut} className="rotate-180" />
            Hisobdan chiqish
          </button>
        </aside>

        {/* Main */}
        <main className="w-full">
          <Outlet />
        </main>
      </div>

      {/* Modals */}
      <UpdateAvatarModal />
    </div>
  );
};

export default ProfileLayout;
