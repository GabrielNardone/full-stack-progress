import { useState, useEffect } from "react"
import { FetchAllPokemonResponse, Pokemon, Result } from '../interfaces/fetchAllPokemonsResponse';

export const usePokemon = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState<Pokemon[]>([])

  //* Si en el url escribís limit=15 te devuelve esa cantidad
  const fetchPokemons = async () => {

    setIsLoading(true)

    const resp = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1500")
    const data: FetchAllPokemonResponse = await resp.json()

    const pokeList: Result[] = data.results

    setData(createPokemonObject(pokeList))
    setIsLoading(false)
  }

  const createPokemonObject = (pokeList: Result[]): Pokemon[] => {

    const pokeArray: Pokemon[] = pokeList.map(pokemon => {

      const pokeUrl = pokemon.url.split('/');
      const id = pokeUrl[6]; 
      const pic = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`

      return {
        id: id,
        name: pokemon.name,
        pic: pic
      }
    })

    return pokeArray
  }

  useEffect(() => {
    fetchPokemons()
  }, [])

  return (
    {
      isLoading,
      data
    }
  )
}
