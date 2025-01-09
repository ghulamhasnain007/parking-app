import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
// import Login from './pages/Login';
// import Signup from './pages/SignUp';
// import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';
// import AdminLayout from './layout/DasboardLayout';
// import DashboardLayoutNavigationDividers from './pages/Dashboard';
import Lot from './components/Lot';
import CrudComponent from './components/CrudComponent';
import UserTable from './pages/UserTable';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Register from './pages/Register';
import { UserProvider } from './context/GoogleContext';

// import AdminDashboard from './pages/AdminDashboard';
// import Dashboard from './pages/Dashboard';
// import ProtectedRoute from './components/ProtectedRoutes';

function App() {
  const client = import.meta.env.CLIENT_ID 
    return (
        <AuthProvider>
          <GoogleOAuthProvider clientId={client}>
            <Router>
              <UserProvider>
                <Routes>
                  {/* <Route element={AdminLayout}>
                    // <Route path='/' element={<Home/>}/>
                    <Route path='/' element={<Home/>}/>
                  </Route> */}
                  {/* <Route path='/dashboard' element={<DashboardLayoutNavigationDividers/>}/> */}
                  <Route path='/' element={<Login/>}/>
                  <Route path='home' element={<Home/>}/>
                  <Route path='/lot' element={<Lot/>}/>
                  <Route path='/user' element={<UserTable/>}/>
                  <Route path='/signup' element={<SignUp/>}/>
                  <Route path='/register' element={<Register/>}/>
                  <Route path='/dashboard' element={<CrudComponent/>}/>
                </Routes>
              </UserProvider>
            </Router>
            </GoogleOAuthProvider>
        </AuthProvider>
    );
}

export default App;