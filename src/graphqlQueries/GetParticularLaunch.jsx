import React from 'react'
import { useQuery, gql, useReactiveVar } from "@apollo/client"
import { testReactiveVar } from '../App';


function GetParticularLaunch() {

  const launchIdSelected = useReactiveVar(testReactiveVar);

  const SINGLELAUNCHQUERY = gql `
  query Launch($launchId: ID!) {
    launch(id: $launchId) {
      mission_name
      rocket {
        rocket {
          description
        }
      }
    }
  }`;

  const { loading, error, data } = useQuery(SINGLELAUNCHQUERY, 
    {
      variables: { launchId: launchIdSelected }
    });
  if(loading) return <p>Loading.....</p>;
  if(error) return <p>Error: {error}</p>;

  // console.log(data);

  const dataCheck = () => {
    if(!data) {
      return true
    }
    return false
  }

  return (
    <div>
      {
        dataCheck() ? 
        <p>Nothing to show</p>
        :
        <>
        <h1>Your Particular Launch Details</h1>
        <h3>Misson Name - {data.launch.mission_name}</h3> 
        </>  
      }
    </div>
  )
}

export default GetParticularLaunch;

