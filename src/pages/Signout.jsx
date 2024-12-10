import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
function Signout() {
  const Navigate = useNavigate();
  useEffect(() => {
    localStorage.removeItem("login");
    Navigate("/");
  });

  return (
    <>
      <h1 className="text-black">\ Anda Sign Out....</h1>
    </>
  );
}
export default Signout;
