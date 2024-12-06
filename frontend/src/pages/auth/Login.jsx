import CommonForm from "@/components/CommonForm";
import { loginFormControls } from "@/data";
import { useState } from "react";
import { Link } from "react-router";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const [formData, setFormData] = useState(initialState);

  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="bg-white w-[450px] h-auto px-10 py-8 rounded-md ">
      <div className="text-center">
        <h1 className="font-bold text-3xl">Sign in to your account</h1>
        <div className="flex items-center justify-center gap-1 mt-2">
          <p>Don&apos;t have an account?</p>
          <Link
            to="/auth/register"
            className="text-green-500 font-semibold hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
      <div>
        <CommonForm
          formControl={loginFormControls}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
          buttonText="Login"
        />
      </div>

      <div>
        <div></div>
      </div>
    </div>
  );
}
