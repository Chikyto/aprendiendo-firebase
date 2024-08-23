import './App.css';


//importamos nuestros componentes
import Show from "./components/Show";
import Edit from './components/Edit';
import Create from './components/Create';

//imoprtamos en router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Show />} />
          <Route path="/create" element={<Create />} />
          <Route path="/edit/:id" element={<Edit />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
