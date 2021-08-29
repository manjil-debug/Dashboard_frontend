import Users from "./component/tables/Users";
import Subscriptions from "./component/tables/Subscriptions";
import Topbar from "./component/topbar/Topbar";
import {Route} from 'react-router-dom';
import '../src/App.css'
import Hompage from "./component/Homepage/Hompage";


function App() {
  return (
    <div>
      <Topbar/>
      <div className="main">
        <Route exact path="/" component={Hompage}/>
        <Route exact path="/users" component={Users}/>
        <Route exact path="/subs" component={Subscriptions}/>

      </div>
    </div>
  );
} 

export default App;
