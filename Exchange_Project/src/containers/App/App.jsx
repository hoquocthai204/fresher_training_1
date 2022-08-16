import { Header } from '../../shared/components/header'
import { Introduce } from '../../shared/components/introduce';
import HomePage from '../Home/home'
import LoginPage from '../Login/login';
import RegisterPage from '../Register/register'
import WalletPage from '../Wallet/wallet';
import DepositPage from '../Deposit/deposit'
import WithdrawPage from '../Withdraw/withdraw';
import NotFound from '../NotFound/notFound';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';

function App() {
  const states = useSelector(state => state.home);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(states.language.code)
  }, [states.language])

  return (
    <div className="App">
      <Router>
        <Header t={t} />
        <Introduce t={t} />

        <Routes>
          <Route path='/login' element={<LoginPage t={t} />} />
          <Route path='/register' element={<RegisterPage t={t} />} />
          <Route path='/wallet/*' element={<WalletPage t={t} />} />
          <Route path='/deposit' element={<DepositPage />} />
          <Route path='/withdraw' element={<WithdrawPage />} />
          <Route path='/' element={<HomePage t={t} />} />
          <Route path='*' element={<NotFound t={t} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
