import { useEffect, useState } from "react";

const WelcomeSection = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:5000/dashboard/profile', {
          method: 'GET',
          credentials: 'include',
        });
        if (!res.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchUser();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-900">
        Welcome back, {user.username}!
      </h1>
      <p className="text-gray-600">Ready to build something amazing? Let's find your next hackathon team.</p>
    </div>
  );
};

export default WelcomeSection;
