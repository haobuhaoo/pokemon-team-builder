import { useCallback, useMemo, useState } from "react";
import { Autocomplete, TextField, Box, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

import type { Pokemon, PokemonList } from "../entities/pokemon";

import { fetchByUrl } from "../services/fetchPokemon";

type Props = {
    allPokemon: PokemonList[];
    setPokemon: React.Dispatch<React.SetStateAction<Pokemon | null>>;
    addPokemon: (pkm: Pokemon) => void;
    removePokemon: () => void;
}

const SearchPokemon: React.FC<Props> = ({ allPokemon, setPokemon, addPokemon, removePokemon }) => {
    const [inputValue, setInputValue] = useState<string>("");
    const [selectedPokemon, setSelectedPokemon] = useState<PokemonList | null>(null);

    const filteredOptions = useMemo(() => {
        return allPokemon
            .filter((opt) => opt.name.toLowerCase().includes(inputValue.toLowerCase()))
            .slice(0, 20);
    }, [allPokemon, inputValue]);

    const handleAddPokemon = useCallback((pokemon: PokemonList) => {
        fetchByUrl(pokemon.url).then(res => {
            if (res) {
                setPokemon(res);
                setSelectedPokemon(pokemon);
                addPokemon(res);
            }
        });
    }, [addPokemon, setPokemon]);

    const handleRemovePokemon = useCallback(() => {
        setPokemon(null);
        setSelectedPokemon(null);
        setInputValue("");
        removePokemon();
    }, [removePokemon, setPokemon]);

    return (
        <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
            <Box sx={{ width: "100%", ml: 2, mr: 4.5, mt: 1 }}>
                <Autocomplete
                    options={filteredOptions}
                    getOptionLabel={(option) => option.name}
                    value={selectedPokemon}
                    inputValue={inputValue}
                    onInputChange={(_, newInputValue) => {
                        setInputValue(newInputValue);
                    }}
                    onChange={(_, value) => {
                        setSelectedPokemon(value);
                        if (value) handleAddPokemon(value);
                    }}
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
                    onClick={() => handleRemovePokemon()}>
                    <DeleteIcon sx={{ borderRadius: 10 }} />
                </IconButton>
            </Box>
        </Box>
    )
}

export default SearchPokemon