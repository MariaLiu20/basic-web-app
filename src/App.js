import './App.css';
import Button from 'react-bootstrap/Button'
import { Home } from './components/Home'
import { Department } from './components/Department';
import { Employee } from './components/Employee';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  const handleClick = () => {
    console.log("clicked");
  }
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path='/' Component={Home} exact/>
          <Route path='/department' Component={Department} exact/>
          <Route path='/employee' Component={Employee} exact/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
