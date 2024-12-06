import CommonForm from "@/components/CommonForm";
import { registerFormControls } from "@/data";
import { useState } from "react";
import { Link } from "react-router";

const initialState = {
  email: "",
  password: "",
};

export default function Register() {
  const [formData, setFormData] = useState(initialState);

  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className="bg-white w-[450px] h-auto px-10 py-8 rounded-md ">
      <div className="text-center">
        <h1 className="font-bold text-3xl">Create your account</h1>
        <div className="flex items-center justify-center gap-1 mt-2">
          <p>Already have an account?</p>
          <Link
            to="/auth/login"
            className="text-green-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </div>
      </div>

      <CommonForm
        formControl={registerFormControls}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
        buttonText="Sign up"
      />

      <div>
        <div></div>
      </div>
    </div>
  );
}
