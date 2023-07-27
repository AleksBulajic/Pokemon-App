// Import React module
import React from 'react';
import './PokemonList.css';

// Define the PokemonList functional component
export default function PokemonList({ pokemon }) {
  // Map through the 'pokemon' prop and create a list of div elements, each representing a Pokemon name
  const pokemonItem = pokemon.map(p => <div key={p}>{p}</div>);

  // Return the JSX representation of the component
  return ( 
    <div className='pokemon-list-container'>
      <div className='pokemon-list-card'>{pokemonItem}</div> {/* Render the list of Pokemon names */}
    </div>
  );
}
