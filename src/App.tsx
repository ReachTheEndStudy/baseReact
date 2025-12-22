import { Link, Route, Switch } from 'wouter';
import { SearchScreen } from './screens/SearchScreen/SearchScreen';
import { CityScreen } from './screens/CityScreen/CityScreen';



export function App() {
  return <Switch>
    <Route path="/" component={SearchScreen} />
    <Route path="/weather/:city" >
      {params => <CityScreen city={params.city} />}
    </Route>
    <Route path="*">
      <div>
        <Link to="/">Home</Link>
        This is rendered when nothing above has matched
      </div></Route>
  </Switch>;
}

