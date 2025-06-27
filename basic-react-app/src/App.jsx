import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import Dashboard from './Dashboard';
import FarmRegistration from './farmregistration';
import DailyAccess from './DailyAccess';
import viewedit from './viewedit';
import SoilInfo from './soilinfo';
import CropInfo from './CropInfo';
import IrrigationInfo from './IrrigationInfo';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/farmregistration" element={<FarmRegistration />} />
        <Route path="/daily-access" element={<DailyAccess />} />
        <Route path="/view-edit" element={<viewedit/>} />
        <Route path="/soil-info" element={<SoilInfo/>} />
        <Route path="/crop-info" element={<CropInfo/>} />
        <Route path="/irrigation-info" element={<IrrigationInfo/>} />
      </Routes>
    </Router>
  );
}

export default App;