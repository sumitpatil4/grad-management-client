import './App.css';
import Home from './components/Home/Home';
import {Auth} from './components/Contextapi/Authcontext'

function App() {
  return (
    <div className="App">
      <Auth>
        <Home/>
      </Auth>
    </div>
  );
}

export default App;
