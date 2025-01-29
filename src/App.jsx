import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const MovieList = lazy(() => import('./pages/MovieList/MovieList'));
const MovieDetails = lazy(() => import('./pages/MovieDetails/MovieDetails'));
const AddMovie = lazy(() => import('./components/AddMovie/AddMovie'));
const EditMovie = lazy(() => import('./components/EditMovie/EditMovie'));
const NotFound = lazy(() => import('./pages/NotFound/NotFound'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="/add" element={<AddMovie />} />
          <Route path="/edit/:id" element={<EditMovie />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
