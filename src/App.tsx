import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/Layout';
import Search from './pages/Search';
import Home from './pages/Home';
import AccParam from './pages/AccParam';
import CreateAcc from './pages/CreateAcc';
import FicheVoyage from './pages/FicheVoyage';
import Login from './pages/Login';
import ResetPwd from './pages/ResetPwd';
import SetPwd from './pages/SetPwd';
import VerifCode from './pages/VerifCode';
import Cart from './pages/Cart';
import OrderConfirmation from './pages/OrderConfirmation';
import NotFound from './pages/NotFound';
import LayoutAdmin from './backoffice/LayoutAdmin';
import CrudT from './backoffice/CrudT';
import CrudO from './backoffice/CrudO';
import CrudU from './backoffice/CrudU';
import Authenfication from './backoffice/Authenfication';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/account" element={<AccParam />} />
            <Route path="/signup" element={<CreateAcc />} />
            <Route path="/trip/:id" element={<FicheVoyage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/resetpwd" element={<ResetPwd />} />
            <Route path="/setpwd" element={<SetPwd />} />
            <Route path="/verification" element={<VerifCode />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
          </Route>


          <Route path="/admin-login" element={<Authenfication/>}/>
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route path="crudT" element={<CrudT />} />
            <Route path="crudU" element={<CrudU />} />
            <Route path="crudO" element={<CrudO />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
