import React, {useState, useEffect} from "react";
import PokemonCollection from "./PokemonCollection";
import PokemonForm from "./PokemonForm";
import Search from "./Search";
import { Container } from "semantic-ui-react";

function PokemonPage() {
  const [isLoaded, setLoaded] = useState(false);
  const [pokemon, changePoke] = useState([]);
  const [searchText, changeSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:3001/pokemon')
      .then((r) => r.json())
      .then((pokeList) => {
        changePoke(pokeList);
        setLoaded(true);
      });
  }, []);

  function handleSearch(text) {
    changeSearch(text);
  }

  function handleSubmit(newPoke) {
    changePoke([...pokemon, newPoke]);
  }

  if (!isLoaded) return <h3>Loading...</h3>;
  return (
    <Container>
      <h1>Pokemon Searcher</h1>
      <br />
      <PokemonForm onPokeSubmit={handleSubmit} />
      <br />
      <Search onSearchChange={handleSearch} />
      <br />
      <PokemonCollection pokemon={pokemon} searchText={searchText} />
    </Container>
  );
}

export default PokemonPage;
