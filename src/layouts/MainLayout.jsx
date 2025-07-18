// Router
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
