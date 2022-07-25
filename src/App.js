import { useState } from 'react';
import './App.css';
import GetLaunchesQuery from './graphqlQueries/GetLaunchesQuery';

function App() {

  const [showLaunches, setShowLaunches] = useState(false);
  const [buttonValue, setButtonValue] = useState('Click Here To View All Missions')

  const toggleMissionView = () => setShowLaunches(showLaunches => !showLaunches);


  return (
    <div className="App">
      <h1>Apollo Client Hooks Demo</h1>
      <button onClick={toggleMissionView}>{buttonValue}</button>
      { 
        showLaunches ? 
          <p><GetLaunchesQuery /></p> 
          : 
          <p>Nothing to see here if you dont press the button...</p>
      }
    </div>
  );
}

export default App;
