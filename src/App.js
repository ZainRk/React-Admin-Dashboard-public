import './App.css'
import MainDash from './components/MainDash/MainDash';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
      <div className="AppGlass">
        <Sidebar/>
        <MainDash/>
      </div>
    </div>
  );
}

export default App;
