import { Route, Routes } from 'react-router-dom';
import Orders from './pages/Orders';
import CreateOrder from './pages/CreateOrder';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Orders />} />
        <Route path="/create" element={<CreateOrder />} />
      </Routes>
    </Provider>
  );
}

export default App;
