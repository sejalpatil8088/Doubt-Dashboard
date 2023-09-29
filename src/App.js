
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import { Route, Routes } from 'react-router-dom';
import Mainpage from './Components/MainPage';
import SheetPage from './Components/SheetPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboad' element={<Dashboard />} />
        <Route path='/mainpage' element={<Mainpage />} />
        <Route path='/sheetpage' element={<SheetPage />} />
      </Routes>
    </div>
  );
}

export default App;