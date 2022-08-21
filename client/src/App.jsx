import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { Header } from './components';
import { Home, Apartment } from './pages';

import { setSection } from './app/reducers/sectionObserver';
import { useDispatch } from 'react-redux';

const App = () => {
  const dispatch = useDispatch();
  return (
    <div className="app" onClick={() => dispatch(setSection(null))}>
      <Header />

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/apartment/:id" element={<Apartment />} />
      </Routes>

    </div>
  )
}

export default App;