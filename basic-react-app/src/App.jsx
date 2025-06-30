//import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '/src/app/store.js';
import ProtectedRoute from '/src/components/ProtectedRoute.jsx';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import Dashboard from './Dashboard';
import FarmRegistration from './farmregistration';
import DailyAccess from './DailyAccess';
import viewedit from './viewedit';
import SoilInfo from './soilinfo';
import CropInfo from './CropInfo';
import IrrigationInfo from './IrrigationInfo';
//import { Provider } from 'react-redux';


function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            {/* Add other protected routes here */}
          </Route>
        <Route path="/farmregistration" element={<FarmRegistration />} />
        <Route path="/daily-access" element={<DailyAccess />} />
        <Route path="/view-edit" element={<viewedit/>} />
        <Route path="/soil-info" element={<SoilInfo/>} />
        <Route path="/crop-info" element={<CropInfo/>} />
        <Route path="/irrigation-info" element={<IrrigationInfo/>} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;