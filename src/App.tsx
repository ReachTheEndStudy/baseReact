import { Link, Route, Switch } from 'wouter';
import { SearchScreen } from './screens/SearchScreen/SearchScreen';
import { CityScreen } from './screens/CityScreen/CityScreen';
import { useEffect } from 'react';

// formatter - preiter, linter - eslint

const a = { a: 12, 'b-c': 12 };

export function App() {
  if (Math.random() < 0.5) {
    useEffect(() => {
      console.log(12);
    }, []);
  }
  return (
    <Switch>
      <Route path='/' component={SearchScreen} />
      <Route path='/weather/:city'>
        {(params) => <CityScreen city={params.city} />}
      </Route>
      <Route path='*'>
        <div>
          <Link to='/'>Home</Link>
          This is rendered when nothing above has matched
        </div>
      </Route>
    </Switch>
  );
}
