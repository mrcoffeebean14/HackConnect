import { Link, useNavigate } from 'react-router-dom';
import Navbar from "../compounts/home/Navbar";
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          email: form.email, // backend expects email as "usernameField"
          password: form.password
        })
      });

      if (!res.ok) {
        throw new Error('Login failed. Please check your credentials.');
      }

      const data = await res.json();
      console.log("Login success:", data);

      if (res.ok ) {
        // ✅ Registration success → redirect to dashboard
        navigate('/dashboard');
      } else {
        alert( "Login failed");
      }
      // redirect or update state
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link to="/" className="flex items-center justify-center space-x-2 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">HC</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">HackConnect</span>
            </Link>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h2>
            <p className="text-gray-600">Sign in to your account to continue</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mt-6 flex flex-col items-center">

              <a
                href="http://localhost:5000/auth/google"
                className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-lg py-3 text-gray-700 hover:bg-gray-50 transition mb-2"
                style={{ textDecoration: 'none' }}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48"><g><path d="M44.5 20H24v8.5h11.7C34.1 33.7 29.6 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.7 0 5.2.9 7.2 2.4l6.4-6.4C34.3 5.1 29.4 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21c10.5 0 20-7.5 20-21 0-1.3-.1-2.7-.5-4z" fill="#FFC107"/><path d="M6.3 14.7l7 5.1C15.5 17.1 19.4 15 24 15c2.7 0 5.2.9 7.2 2.4l6.4-6.4C34.3 5.1 29.4 3 24 3c-7.2 0-13.4 3.1-17.7 8.1z" fill="#FF3D00"/><path d="M24 45c5.4 0 10.3-1.8 14.1-4.9l-6.5-5.3C29.5 36.9 26.9 38 24 38c-5.5 0-10.1-3.5-11.8-8.3l-7 5.4C7.9 41.6 15.4 45 24 45z" fill="#4CAF50"/><path d="M44.5 20H24v8.5h11.7c-1.1 3.1-4.1 5.5-7.7 5.5-2.2 0-4.2-.7-5.7-2.1l-7 5.4C15.9 41.6 19.7 45 24 45c10.5 0 20-7.5 20-21 0-1.3-.1-2.7-.5-4z" fill="#1976D2"/></g></svg>
                Login with Google
              </a>
              <br />
              <a
                href="http://localhost:5000/auth/github"
                className="w-full flex items-center justify-center bg-white border border-gray-300 rounded-lg py-3 text-gray-700 hover:bg-gray-50 transition"
                style={{ textDecoration: 'none' }}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 21.13V23"/></svg>
                Login with GitHub
              </a>
              <span className="text-gray-500 mb-2">or</span>
              </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>

              <div className="flex justify-between items-center">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Remember me</span>
                </label>
                <a href="#" className="text-sm text-blue-600">Forgot password?</a>
              </div>

              <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg">
                Sign in
              </button>

              <p className="text-center text-sm mt-4">
                Don't have an account? <Link to="/register" className="text-blue-600">Sign up</Link>
              </p>
            </form>
            
            </div>
          </div>
        </div>
    </>
  );
};

export default Login;
