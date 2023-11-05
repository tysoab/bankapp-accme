import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";

const RootLayout = function(props){

  return <>
    <Header />
    <Outlet />
  </>
};

export default RootLayout;