import { React } from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';

import Login from './routes/Login/login.component';
import Home from './routes/Home/home';

import './App.css';

function App() {
  return (
    <div className='Root'>
        <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element ={ <Login /> } />
                    <Route exact path="/home" element ={ <Home /> } />
                </Routes>
            </BrowserRouter>
        </div>
    </div>
  );
}

export default App;
