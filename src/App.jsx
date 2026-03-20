import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

// Pages
import Landing from './pages/Landing';
import Features from './pages/Features';
import Claims from './pages/Claims';
import Login from './pages/Login';
import Register from './pages/Register';
import Coverage from './pages/Coverage';
import Dashboard from './pages/Dashboard';
import Earnings from './pages/Earnings';
import Insurance from './pages/Insurance';
import Safety from './pages/Safety';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-brand-50 text-brand-900">
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Landing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/claims" element={<Claims />} />
          <Route path="/coverage" element={<Coverage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/dashboard/earnings" element={<Earnings />} />
            <Route path="/dashboard/insurance" element={<Insurance />} />
            <Route path="/dashboard/safety" element={<Safety />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
