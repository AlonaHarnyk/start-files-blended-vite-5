import { Routes, Route, Navigate } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import Header from './components/Header/Header';
const Home = lazy(() => import('./pages/Home'));
const Rates = lazy(() => import('./pages/Rates'));
import { useDispatch } from 'react-redux';
import { getCurrentCurrency } from './redux/operations';
import { setDefaultBaseCurrency } from './redux/slice';

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async position =>
        dispatch(
          getCurrentCurrency({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          }),
        ),
      error => {
        if (error.code === 1) {
          dispatch(setDefaultBaseCurrency('USD'));
        }
      },
    );
  }, [dispatch]);

  return (
    <>
      <Header />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rates" element={<Rates />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </>
  );
};
