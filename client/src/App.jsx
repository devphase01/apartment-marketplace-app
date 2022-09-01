import { Route, Routes } from 'react-router-dom';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from './components';
import { Home, Details, Create } from './pages';

import { setSection } from './app/reducers/sectionObserver';

function App() {
  const dispatch = useDispatch();
  const { isEditing } = useSelector((state) => state.apartments);
  return (
    <div className={`app ${isEditing ? 'editing' : ''}`} onClick={() => dispatch(setSection(null))}>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/apartment/:id" element={<Details />} />
      </Routes>

    </div>
  );
}

export default App;
