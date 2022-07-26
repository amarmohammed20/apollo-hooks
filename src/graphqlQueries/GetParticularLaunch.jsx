import React from 'react'
import { useQuery, gql } from "@apollo/client"

function GetParticularLaunch(props) {
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
      variables: { launchId: props.id }
    });
  if(loading) return <p>Loading.....</p>;
  if(error) return <p>Error: {error}</p>;

  console.log(data);

  return (
    <div>
      <h1>Your Particular Launch Details</h1>
      <h3>Misson Name - {data.launch.mission_name}</h3>
    </div>
  )
}

export default GetParticularLaunch;

