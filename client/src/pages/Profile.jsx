import { useAuth } from '../hooks/useAuth';

function Profile() {
  const { user } = useAuth();

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>
      <div className="space-y-4">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role === 'job_seeker' ? 'Job Seeker' : 'Employer'}</p>
      </div>
    </div>
  );
}

export default Profile;