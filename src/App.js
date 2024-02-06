import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainDash from './components/MainDash/MainDash';
import RightSide from './components/RigtSide/RightSide';
import Sidebar from './components/Sidebar';
// Giả sử bạn đã tạo các trang này
// import DashboardPage from './pages/DashboardPage';

import SubdivisionPage from './pages/subdivision';
import AnalyticPage from './pages/analytic';
import CustomerPage from './pages/customer';
import OrdersPage from './pages/order';
import ProjectPage from './pages/project';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="AppGlass">
          <Sidebar />
          <Routes>
            <Route path="/" element={<MainDash />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/customers" element={<CustomerPage />} />
            <Route path="/subdivisions" element={<SubdivisionPage />} />
            <Route path="/projects" element={<ProjectPage />} />
            <Route path="/analytics" element={<AnalyticPage />} />
          </Routes>
          <RightSide />
        </div>
      </div>
    </Router>
  );
}

export default App;
