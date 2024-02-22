// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar';
import AnimePage from './Pages/AnimePage/AnimePage';
import { AnimatePresence } from 'framer-motion';
import AnimeInfoPage from './Pages/AnimeInfoPage/AnimeInfoPage';
import Episode from './Pages/Episode/Episode';

function App () {
  return (
    <BrowserRouter>
      <AnimatePresence mode='wait'>
        <Routes>
          <Route path='/' element={ <Navbar /> }>
            <Route index path='/' element={ <AnimePage /> } />
            <Route path='/:animeID' element={ <AnimeInfoPage /> }>
              <Route path='/:animeID/:epID' element={ <Episode /> } />
            </Route>
          </Route>
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  );
}


export default App;
