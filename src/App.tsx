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
import ResearchResult from './pages/ResearchResult';

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
            <Route path="/searchresult" element={<ResearchResult />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </>
  );
}

export default App;
