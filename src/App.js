// Import necessary modules and components
import React, { useState, useEffect } from "react";
import PokemonList from "./component/PokemonList";
import axios from "axios";
import Pagination from "./component/Pagination";

// Define the main App component
function App() {
  // Set up state variables using the useState hook
  const [pokemon, setPokemon] = useState([]); // Stores an array of Pokemon names
  const [currentPageUrl, setCurrentPageUrl] = useState("https://pokeapi.co/api/v2/pokemon"); // Holds the URL of the current page of Pokemon data
  const [nextPageUrl, setNextPageUrl] = useState(); // Holds the URL of the next page of Pokemon data
  const [previusPageUrl, setPreviusPageUrl] = useState(); // Holds the URL of the previous page of Pokemon data
  const [loading, setLoading] = useState(true); // A flag to indicate if data is being loaded

  // useEffect hook is used to fetch data when the component mounts and whenever currentPageUrl changes
  useEffect(() => {
    setLoading(true); // Set loading to true before starting the data fetch
    let cancel; // Create a variable to hold the cancel token for axios requests

    // Define an asynchronous function to fetch Pokemon data
    const fetchData = async () => {
      try {
        // Send a GET request to the currentPageUrl using axios
        const res = await axios.get(currentPageUrl, {
          // Set up a cancel token to handle cleanup if needed
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });

        setLoading(false); // Set loading to false after successfully fetching data
        setNextPageUrl(res.data.next); // Set the URL of the next page from the response
        setPreviusPageUrl(res.data.previous); // Set the URL of the previous page from the response
        setPokemon(res.data.results.map((p) => p.name)); // Extract Pokemon names from the response and update the 'pokemon' state
      } catch (error) {
        // Handle errors and check if the error is due to a canceled request
        if (axios.isCancel(error)) {
          // Do nothing if the request was canceled
        } else {
          console.error("Error fetching data:", error); // Log other errors to the console
        }
      }
    };

    fetchData(); // Call the fetchData function

    // Cleanup function that cancels the axios request if the component is unmounted or currentPageUrl changes
    return () => cancel();
  }, [currentPageUrl]); // The effect depends on the 'currentPageUrl' state variable

  // Function to go to the next page of Pokemon data
  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl); // Update the 'currentPageUrl' with the 'nextPageUrl'
  }

  // Function to go to the previous page of Pokemon data
  function gotoPreviusPage() {
    setCurrentPageUrl(previusPageUrl); // Update the 'currentPageUrl' with the 'previusPageUrl'
  }

  // If data is loading, show a loading message
  if (loading) return <div>Loading...</div>;

  // Render the PokemonList component with the current Pokemon data and the Pagination component
  return (
    <>
      <Pagination
        gotoNextPage={nextPageUrl ? gotoNextPage : null}
        gotoPreviusPage={previusPageUrl ? gotoPreviusPage : null}
      />
      <PokemonList pokemon={pokemon} />
    
    </>
  );
}

export default App; // Export the App component as the default export
