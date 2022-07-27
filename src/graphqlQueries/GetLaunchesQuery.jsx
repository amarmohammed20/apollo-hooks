import React from 'react';
import { useQuery, gql } from "@apollo/client";
import '../App.css';

function GetLaunchesQuery() {
  const LAUNCHESQUERY = gql `
    query GetLaunches {
        launches {
            id
            launch_success
            launch_year
            mission_name
        }
    }`;

  const { loading, error, data } = useQuery(LAUNCHESQUERY);
  if(loading) return <p>Loading.....</p>;
  if(error) return <p>Error: {error}</p>;

  // console.log(data);

  return (
    <div>
      <h1>Launches Comp</h1>
        {
          data.launches.map((launch) => {
            return (
            <div className='launchesInfo' key={launch.id}>
            <p>Launch ID - {launch.id}</p>
            <p>Mission name - {launch.mission_name}</p>
            </div>
            )
          })
        }      
    </div>
  )
}

export default GetLaunchesQuery;

