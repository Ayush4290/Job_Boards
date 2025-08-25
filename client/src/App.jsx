import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import Header from './components/ui/Header.jsx';
import Footer from './components/ui/Footer.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import JobDetails from './pages/JobDetails.jsx';
import PostJob from './pages/PostJob.jsx';
import MyJobs from './pages/MyJobs.jsx';
import Applications from './pages/Applications.jsx';
import Profile from './pages/Profile.jsx';

function ProtectedRoute({ children, role }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (role && user.role !== role) return <Navigate to="/" />;
  return children;
}

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route
            path="/post-job"
            element={
              <ProtectedRoute role="employer">
                <PostJob />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-jobs"
            element={
              <ProtectedRoute role="employer">
                <MyJobs />
              </ProtectedRoute>
            }
          />
          <Route
            path="/applications"
            element={
              <ProtectedRoute role="job_seeker">
                <Applications />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;