import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ModeContext } from './contexts/ModeProvider';
import Home from './pages/home/Home';
import MenuButton from './components/MenuButton';
import './styles/index.css';
import DynamicFavicon from './components/DynamicFavicon';
import StudentModules from './pages/home/sections/StudentModules';

function App() {
  const { mode } = useContext(ModeContext);

  return (
    <div className={mode}>
      <DynamicFavicon />
      <Routes>
        <Route path="/" element={<StudentModules />} />
        <Route path="/portfolio" element={<><MenuButton /><Home /></>} />
      </Routes>
    </div>
  );
}

export default App;
