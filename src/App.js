import { useEffect, useState } from 'react';
import './App.css';
import GetLaunchesQuery from './graphqlQueries/GetLaunchesQuery';
import GetParticularLaunch from './graphqlQueries/GetParticularLaunch';
import { makeVar, useReactiveVar } from "@apollo/client";
import useQueryVarImage from './useQueryVariable.jpg';

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
      <div className="useQueryInfo">
        <h2>useQuery Hook</h2>
        <p>The useQuery React hook is the primary API for executing queries in an Apollo application. 
          To run a query within a React component, call useQuery and pass it a GraphQL query string. 
          When your component renders, useQuery returns an object from Apollo Client that contains loading, error, and data properties you can use to render your UI.</p>
        <br />
        <h2>Example</h2>
        <p>This example we are simply using the space x graphql api and pulling down basic detials of the launches.</p>
        <button onClick={toggleMissionView}>Show and unshow Missions</button>
        { 
          showLaunches ? 
            <p><GetLaunchesQuery /></p> 
            : 
            <p>Nothing to see here if you dont press the button...</p>
        }
      </div>
      <div className={'particularLaunchFinder'}>
        <h2>useQuery Hook With Variable</h2>
        <p>This example is just a basic useQuery hook but here we are using a paramter which in turn is using a variable.
          When we pass in a variable we do this through passing in a parameter in the gql query.
          The variable is passed in when you use the useQuery hook which in turn uses the gql.
        </p>
        <br />
        <img src={useQueryVarImage}/>
        <br />
        <h3>Variables</h3>
        <p>An object containing all of the GraphQL variables your query requires to execute.
          Each key in the object corresponds to a variable name, and that key's value corresponds to the variable value.</p>
        <br />
        <h2>Example</h2>
        <p>Pick a number between 1 and 30 to see a particular launch</p>
        <input id={'launchIdInput'} onInput={e => launchIdChosen(e)} type="text"/>
        <button onClick={findOtherLaunch}>Try Another</button>
      {
          showSingleLaunch ? 
          <p><GetParticularLaunch /></p> 
          : 
          <p>Waiting...</p>
        }
      </div>
      <div className="useReactiveVarSection">
        <h2>Reactive Variables - useReactiveVar</h2>
        <p><a href="https://www.apollographql.com/docs/react/local-state/reactive-variables/" target={"_blank"}>Reactive variables</a> are a useful mechanism for representing local state outside of the Apollo Client cache. 
          Because they're separate from the cache, reactive variables can store data of any type and structure, and you can interact with them anywhere in your application without using GraphQL syntax.
          Most importantly, modifying a reactive variable triggers an update of every active query that depends on that variable. Additionally, this updates the React state for components that use the useReactiveVar React hook.</p>
        <br />
        <h2>Example</h2>
        <p>Above we have the ability to use the useQuery to find a particular launch. So what I have done is use the useReactiveVar hook to store the input of the number above of the launch you want to see. 
          I can now access this id anywhere in the app by using the useReactiveVar hook.  
        </p>
        <p>The useReactiveVar hook can be used to read from a reactive variable in a way that allows the React component to re-render if/when the variable is next updated.
          Previously, the only way for a reactive variable to trigger a React component re-render was through the use of useQuery. 
          Now you don't have to be using useQuery to benefit from the reactivity that ReactiveVar T provides.
          </p>
      </div>
      <div className="useMutation">
        <h2>Mutations - useMutation</h2>
        <p></p>
      </div>
    </div>
  );
}

export default App;
