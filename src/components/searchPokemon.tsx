import { useRef, useState } from "react";
import { Autocomplete, TextField, Box, IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';

import type { Pokemon, PokemonList } from "../entities/pokemon";

import { fetchByUrl } from "../services/fetchPokemon";

type Props = {
    allPokemon: PokemonList[];
    setPokemon: React.Dispatch<React.SetStateAction<Pokemon | null>>;
    increment: () => void;
    decrement: () => void;
}

const SearchPokemon: React.FC<Props> = ({ allPokemon, setPokemon, increment, decrement }) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [selectedPokemon, setSelectedPokemon] = useState<PokemonList | null>(null);
    const hasCounted = useRef(false);

    const addPokemon = (pokemon: typeof allPokemon[number]) => {
        fetchByUrl(pokemon.url).then(fetched => {
            if (fetched) {
                setPokemon(fetched);
                setSelectedPokemon(pokemon);

                if (!hasCounted.current) {
                    increment();
                    hasCounted.current = true;
                }
            }
        })
    };

    const removePokemon = () => {
        if (hasCounted.current) {
            decrement();
            hasCounted.current = false;
        }
        setPokemon(null);
        setSelectedPokemon(null);
        setInputValue("");

    };

    return (
        <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
            <Box sx={{ width: "100%", ml: 2, mr: 4.5, mt: 1 }}>
                <Autocomplete
                    options={allPokemon}
                    getOptionLabel={(option) => option.name}
                    value={selectedPokemon}
                    inputValue={inputValue}
                    onInputChange={(_, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    onChange={(_, value) => {
                        setSelectedPokemon(value);
                        if (value) addPokemon(value);
                    }}
                    filterOptions={(options) =>
                        options.filter((opt) =>
                            opt.name.toLowerCase().includes(inputValue.toLowerCase())
                        ).slice(0, 20)
                    }
                    renderOption={(props, option) => {
                        const { key, ...otherProps } = props
                        return (<li key={key} {...otherProps}>
                            {option.name}
                        </li>)
                    }}
                    renderInput={(params) => <TextField {...params} label="Search Pokémon" />}
                />
            </Box>

            <Box sx={{ position: "relative" }}>
                <IconButton
                    size="small"
                    sx={{ position: "absolute", top: 17, right: 0 }}
                    onClick={() => removePokemon()}>
                    <DeleteIcon sx={{ borderRadius: 10 }} />
                </IconButton>
            </Box>
        </Box>
    )
}

export default SearchPokemon