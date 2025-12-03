import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <Sidebar />
      
      <div className="flex-1 md:ml-96">
        <Outlet />
      </div>
    </div>
  );
}
