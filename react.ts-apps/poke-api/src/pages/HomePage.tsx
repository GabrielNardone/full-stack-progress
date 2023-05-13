import { useState } from "react";
import { Card } from "../components/Card"
import { usePokemon } from "../hooks/usePokemon"
import { Pokemon } from "../interfaces/fetchAllPokemonsResponse";



export const HomePage = () => {

  const { data, isLoading } = usePokemon();
  const [currentPage, setCurrentPage] = useState(0);
  const [search, setSearch] = useState("");

  const filteredPokemons = (): Pokemon[] => {
    if (search.length === 0)
      return data?.slice(currentPage, currentPage + 10)

    //* Si hay algo en el input
    //* El filter me permite repasar un arreglo y si la condición da true devuelve ese elemento

    const filteredPokemons = data.filter(poke => poke.name.includes(search));
    return filteredPokemons.slice(currentPage, currentPage + 10)
  }

  const nextPage = () => {
    if (data.filter(poke => poke.name.includes(search)).length > currentPage + 10)
      setCurrentPage(currentPage + 10)
  }

  const backPage = () => {
    if (currentPage > 0)
      setCurrentPage(currentPage - 10)
  }

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(0);
    setSearch(event.target.value)
  }

  return (
    <div className="App">
      <h1>FIND YOUR POKÉMON</h1>

      <input
        type="text"
        className="searchInput"
        placeholder="Search your Pokémon"
        value={search}
        onChange={onSearchChange}
      />

      <div className="buttons">
        <button onClick={backPage}>Back</button>
        <button onClick={nextPage}>Next</button>
      </div>

      <div className="card-group">
        {
          isLoading
            ? <h2>Is Loading...</h2>
            : !!filteredPokemons() && filteredPokemons().map(card =>
              <Card
                key={card.id}
                props={card}
              />
            )
        }

      </div>
    </div>
  )
}
