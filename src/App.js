import './App.css';
import Users from './components/Users';
import EditUser from './components/EditUser';
import SingletUser from './components/SingleUser';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Users />} />
          <Route exact path="/edituser/:id" element={<EditUser />} />
          <Route exact path="/singleuser/:id" element={<SingletUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
