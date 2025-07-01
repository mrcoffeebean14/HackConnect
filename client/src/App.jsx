import { useEffect } from 'react'
import './App.css'

function App() {
  useEffect(() => {
    fetch('http://localhost:5000')
      .then(res => res.text())
      .then(data => console.log(data));
  }, []);

  return (
    <>
      <h1 className="text-4xl font-bold text-blue-600">Hello Tailwind!</h1>
    </>
  );
}

export default App;
