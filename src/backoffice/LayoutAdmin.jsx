
import { Outlet } from "react-router-dom";
import LoadingBar from "../components/LoadingBar";
import HeaderAdmin from "./HeaderAdmin";
import React, { useState } from 'react';
import CrudT from './CrudT';
import CrudU from './CrudU';

const LayoutAdmin = () => {
  const [view, setView] = useState('trips');
  return (
    <>
      <HeaderAdmin setView={setView} />
      <LoadingBar />
      <main>
        {view === 'trips' && <CrudT />}
        {view === 'users' && <CrudU />}
        <Outlet />
      </main>
    </>
  );
};

export default LayoutAdmin;