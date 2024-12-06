import { Outlet } from "react-router";
import authPageImage from "../assets/authPageImage.jpg";

export default function AuthLayout() {
  return (
    <div className="w-full min-h-screen flex">
      <div className="hidden lg:block flex-1">
        <img
          src={authPageImage}
          alt="authPageImage"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="flex-1 flex items-center justify-center bg-green-200">
        <Outlet />
      </div>
    </div>
  );
}
