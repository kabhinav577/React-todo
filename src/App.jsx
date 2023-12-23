import './App.css';
import Footer from './components/Footer';
import Todos from './components/Todos';

const App = () => {
  return (
    <div className="container">
      <div className="heading">
        <h1>TODO App</h1>
      </div>
      <Todos />
      <Footer />
    </div>
  );
};

export default App;
