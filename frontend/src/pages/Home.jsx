import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { Link } from "react-router";

export default function Home() {
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  return (
    <div className="w-full min-h-screen bg-[##EEEEEE] flex flex-col justify-center items-center gap-10">
      <div className="flex justify-start flex-col">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-blue-400 to-red-500 bg-clip-text text-transparent py-8">
          Welcome, {user?.name || user?.email}
        </h1>
        <h1 className="text-2xl font-medium -my-4">Let do task together</h1>
      </div>
      <div className="flex gap-5 justify-start">
        <Button className="px-10">
          <Link to="/todo">Todo</Link>
        </Button>
        <Button className="px-10"><Link to="/blog">Blog</Link></Button>
      </div>
    </div>
  );
}
