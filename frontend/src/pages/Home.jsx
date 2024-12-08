import { useSelector } from "react-redux";

export default function Home() {
  const { user } = useSelector((state) => state.auth);
  console.log(user);
  
  return (
    <div className="w-full min-h-screen bg-[##EEEEEE] flex justify-center items-center">
      <div>
        <h1>Hi there, {user.userName}</h1>
      </div>
      <div></div>
    </div>
  );
}
