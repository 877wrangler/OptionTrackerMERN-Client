import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, Auth, CreateOrder, SavedOrders } from './pages';
import { Navbar } from './components/navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/create-order' element={<CreateOrder />} />
          <Route path='/saved-orders' element={<SavedOrders />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;