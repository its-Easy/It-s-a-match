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
  );
}

export default App;
