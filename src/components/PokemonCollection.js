import React from "react";
import PokemonCard from "./PokemonCard";
import { Card } from "semantic-ui-react";

function PokemonCollection({pokemon, searchText}) {
  const pokeList = pokemon.filter((poke) => poke.name.includes(searchText))
    .map((poke) => (
      <PokemonCard key={poke.name} pokemon={poke} />
    ));

  return (
    <Card.Group itemsPerRow={6}>
      {pokeList}
    </Card.Group>
  );
}

export default PokemonCollection;
