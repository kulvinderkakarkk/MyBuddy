import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  return (
    <Router>
      <Route exact path="/">Home</Route>
      <Route exact path="/login">Home</Route>
      <Route exact path="/register">Home</Route>
    </Router>
  );
}

export default App;
