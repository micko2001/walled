import NavItems from "./NavItems";
import logo from "../logo/wallet.png";

const MENU = [
  {
    title: "Dashboard",
    link: "/dashboard",
  },
  {
    title: "Transfer",
    link: "/transfer",
  },
  {
    title: "Topup",
    link: "/topup",
  },
  {
    title: "Sign Out",
    link: "/signout",
  },
];

function Navbar() {
  return (
    <nav className="flex mx-auto w-screen justify-between items-center px-8 py-6 bg-white">
      <img src={logo} alt="walled logo" />
      <NavItems menu={MENU} />
    </nav>
  );
}

export default Navbar;
