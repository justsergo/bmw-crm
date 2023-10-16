import { Navigate, Route, Routes } from 'react-router-dom';
import Orders from './pages/Orders';
import CreateOrder from './pages/CreateOrder';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/orders" element={<Orders />} />
        <Route path="/create" element={<CreateOrder />} />
        <Route path="*" element={<Navigate to="/orders" replace={true} />} />
      </Routes>
    </Provider>
  );
}

export default App;
