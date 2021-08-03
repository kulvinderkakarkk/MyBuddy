import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import MenuBar from './components/MenuBar'
import 'semantic-ui-css/semantic.min.css'
import Home from './pages/home'
function App() {
  return (
    <Router>
      <MenuBar />
      <Route exact path="/" component={Home}></Route>
      <Route exact path="/login">Login</Route>
      <Route exact path="/register">Register</Route>
    </Router>
  );
}

export default App;
