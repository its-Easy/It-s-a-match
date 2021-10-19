import './App.css';
import SignIn from './Components/auth/signIn'
import SignUp from './Components/auth/signUp'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import NewsFeed from './Components/newsFeed/newsFeed';

function App() {
  return (
      <Router>
      <Switch>
        <Route exact path='/signUp' component={SignUp}></Route>
        <Route exact path='/signIn' component={SignIn}></Route>
        <Route exact path='/news'><NewsFeed username="smartsaral100@gmail.com" /></Route>
      </Switch>
      </Router>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
