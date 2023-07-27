import React, { useState, useEffect } from "react";
import PokemonList from "./component/PokemonList";
import axios from "axios";
import Pagination from "./component/Pagination";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(
    "https://pokeapi.co/api/v2/pokemon"
  );
  const [nextPageUrl, setNextPageUrl] = useState();
  const [previusPageUrl, setPreviusPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;
    const fetchData = async () => {
      try {
        const res = await axios.get(currentPageUrl, {
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });
        setLoading(false);
        setNextPageUrl(res.data.next);
        setPreviusPageUrl(res.data.previous);
        setPokemon(res.data.results.map((p) => p.name));
      } catch (error) {
        if (axios.isCancel(error)) {
          // Request canceled
        } else {
          // Handle error
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();

    return () => cancel();
  }, [currentPageUrl]);

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPreviusPage() {
    setCurrentPageUrl(previusPageUrl);
  }

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <PokemonList pokemon={pokemon} />
      <Pagination gotoNextPage={gotoNextPage} gotoPreviusPage={gotoPreviusPage} />
    </>
  );
}

export default App;
