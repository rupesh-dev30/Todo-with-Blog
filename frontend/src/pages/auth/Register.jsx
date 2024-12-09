import CommonForm from "@/components/CommonForm";
import { registerFormControls } from "@/data";
import { useToast } from "@/hooks/use-toast";
import { registerUser } from "@/slice/authSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router";

const initialState = {
  email: "",
  password: "",
  name: "",
  userName: "",
};

export default function Register() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();

    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data.payload.message,
          variant: "success",
        });
        navigate("/auth/login");
      } else {
        toast({
          title:
            data?.payload?.message ||
            "User already exist, try again using different account!",
          variant: "destructive",
        });
      }
    });
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
    </div>
  );
}
