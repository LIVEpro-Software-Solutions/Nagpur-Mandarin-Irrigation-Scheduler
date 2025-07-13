// ❌ REMOVE this:
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from '/src/app/store.js';
import ProtectedRoute from '/src/components/ProtectedRoute.jsx';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import Dashboard from './Dashboard';
import FarmRegistration from './FarmRegistration';
import DailyAccess from './DailyAccess';
import SoilInfo from './SoilInfo';
import CropInfo from './CropInfo';
import IrrigationInfo from './IrrigationInfo';
import ViewEdit from './Viewedit';

function App() {
  return (
    <Provider store={store}>
      {/* ✅ REMOVE <BrowserRouter> here */}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        <Route path="/farm-registration" element={<FarmRegistration />} />
        <Route path="/daily-access" element={<DailyAccess />} />
        <Route path="/view-edit" element={<ViewEdit />} />
        <Route path="/soil-info" element={<SoilInfo />} />
        <Route path="/crop-info" element={<CropInfo />} />
        <Route path="/irrigation-info" element={<IrrigationInfo />} />
      </Routes>
      {/* ✅ NO closing </BrowserRouter> needed */}
    </Provider>
  );
}

export default App;
