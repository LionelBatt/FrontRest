import { Outlet } from "react-router-dom";
import LoadingBar from "../components/LoadingBar";
import HeaderAdmin from "./HeaderAdmin";

const LayoutAdmin = () => {
  return (
    <>
      <HeaderAdmin />
      <LoadingBar />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default LayoutAdmin;
