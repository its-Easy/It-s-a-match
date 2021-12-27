import SignIn from './Components/auth/signIn'
import SignUp from './Components/auth/signUp'
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom'
import NewsFeed from './Components/newsFeed/newsFeed';
import BuildProfile from './Components/buildProfile/buildProfile';
import invalidURL from './Components/invalidURL'
import Navbar from './Components/Navbar/Navbar';
import post from './Components/post/post';
import Chats from './Components/chat/chats';

function App() {
  return (
      <Router>
        <Navbar>
          <ul>
            <li><Link to="signUp">Sign Up</Link></li>
          </ul>
        </Navbar>
      <Switch>
        <Route exact path='/signUp' component={SignUp}></Route>
        <Route exact path='/signIn' component={SignIn}></Route>
        <Route exact path='/chats' component={Chats}></Route>
        <Route exact path='/buildProfile' component={BuildProfile}></Route>
        <Route exact path='/post' component={post}></Route>
        <Route exact path='/news' component={NewsFeed}></Route>
        <Route component={invalidURL}></Route>
      </Switch>
      </Router>
  );
}

export default App;
