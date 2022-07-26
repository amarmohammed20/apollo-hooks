import { useEffect, useState } from 'react';
import './App.css';
import GetLaunchesQuery from './graphqlQueries/GetLaunchesQuery';
import GetParticularLaunch from './graphqlQueries/GetParticularLaunch';

function App() {

  const [showLaunches, setShowLaunches] = useState(false);
  const [launchId, setlaunchId] = useState("");

  const toggleMissionView = () => {
    setShowLaunches(showLaunches => !showLaunches);
  }

  const particularLaunchCheck = () => {
    if(launchId === "") {
      return <p>Insert a number between 1 and 30 and we can get cracking</p>
    }
    return (
      <GetParticularLaunch 
      id={launchId}
      />
    )
  }

  useEffect(() => {
    particularLaunchCheck();
  });


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
        <input onInput={e => setlaunchId(e.target.value)} type="text"/>
        <button>Lets find this launch</button>
      </div>
      {particularLaunchCheck()}
    </div>
  );
}

export default App;
