import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Templates from './pages/Templates';
import FocusEdit from './pages/FocusEdit';
import FocusResult from './pages/FocusResult';
import GridEdit from './pages/GridEdit';
import GridResult from './pages/GridResult'; // <-- Import ini

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/templates" element={<Templates />} />
        
        {/* Rute Focus Mode */}
        <Route path="/edit/focus" element={<FocusEdit />} />
        <Route path="/result/focus" element={<FocusResult />} />
        
        {/* Rute Grid Mode */}
        <Route path="/edit/grid" element={<GridEdit />} />
        <Route path="/result/grid" element={<GridResult />} /> {/* <-- Ganti di sini */}
      </Routes>
    </Router>
  );
}

export default App;