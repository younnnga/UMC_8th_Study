import { Provider } from 'react-redux';
import './App.css';
import CartList from './components/CartList';
import Navbar from './components/Navbar';
import PriceBox from './components/PriceBox';
import Modal from './components/Modal';
import store from './store/store';

function App() {
  return (
    <Provider store={store}>
      <Navbar />
      <CartList />
      <PriceBox />
      <Modal /> {/* 여기 꼭 넣기 */}
    </Provider>
  );
}

export default App;
