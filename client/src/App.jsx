import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    fetch('http://localhost:5000')
      .then(res => res.text())
      .then(data => console.log(data));
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-600 to-purple-600 text-white text-3xl ">
      Hello Gradient
    </div>
  );
}

export default App;
