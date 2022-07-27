import { useEffect, useState } from 'react';
import './App.css';
import GetLaunchesQuery from './graphqlQueries/GetLaunchesQuery';
import GetParticularLaunch from './graphqlQueries/GetParticularLaunch';
import { makeVar, useReactiveVar } from "@apollo/client";

export const testReactiveVar = makeVar("");

function App() {

  const [showLaunches, setShowLaunches] = useState(false);
  const [showSingleLaunch, setShowSingleLaunch] = useState(false);

  const toggleMissionView = () => {
    setShowLaunches(showLaunches => !showLaunches);
  }

  const launchIdChosen = (event) => {
    testReactiveVar(event.target.value);
    setShowSingleLaunch(true);
  }

  const findOtherLaunch = () => {
    setShowSingleLaunch(false);
    document.getElementById('launchIdInput').value = '';
  }

  return (
    <div className="App">
      <h1>Apollo Client Hooks Demo</h1>
      <button onClick={toggleMissionView}>Show and unshow Missions</button>
      { 
        showLaunches ? 
          <p><GetLaunchesQuery /></p> 
          : 
          <p>Nothing to see here if you dont press the button...</p>
      }
      <div className={'particularLaunchFinder'}>
        <p>Pick a number between 1 and 30 to see a particular launch</p>
        <input id={'launchIdInput'} onInput={e => launchIdChosen(e)} type="text"/>
        <button onClick={findOtherLaunch}>Try Another</button>
      </div>
      {
          showSingleLaunch ? 
          <p><GetParticularLaunch /></p> 
          : 
          <p>Waiting...</p>
        }
    </div>
  );
}

export default App;
