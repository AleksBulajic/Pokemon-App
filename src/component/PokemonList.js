import React from 'react'

export default function PokemonList({pokemon}) {
  
    const pokemonItam = pokemon.map(p => <div key={p}>{p}</div>)

    
  return ( 
    <div>
     <div>{pokemonItam}</div>
    </div>
  )
}
 