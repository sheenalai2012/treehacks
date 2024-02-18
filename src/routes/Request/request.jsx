import { Button, Chip, FormControl, FormControlLabel, FormHelperText, FormLabel, Input, InputLabel, Select, Stack, Typography } from "@mui/material"
import { useFormControlContext } from '@mui/base/FormControl';


import { useState } from "react";

export const SelectChip = ({text, handleChange, index}) => {
    const [selected, setSelected] = useState(false);

    const onClick = () => {
        setSelected(!selected);
        handleChange(index);
    }
    
    return   <Chip label={text} onClick={onClick} variant={selected ?  undefined : 'outlined'} /> ;
}

export const MultiSelect = ({list, handleChange}) => {
    return <Stack direction="row" spacing={1}>
        {list.map((item, index) => <SelectChip key={index} text={item.label} handleChange={handleChange} index={index}  />
)}
        </Stack>;
}


export const Request = () => {
    const [phoneNumber, setPhoneNumber] = useState(''); 
    const handlePhoneNumber = (e) => {
        setPhoneNumber(e.target.value);
    }
    const priceOptions = [{label: '$'}, {label: '$$'}, {label: '$$$'}, {label: '$$$$'}]
    const [selectedPrices, setSelectedPrices] = useState(new Set());

    const handlePriceSelect = (index) => {
        if (selectedPrices.has(index)) {
            const newSelectedPrices = new Set(selectedPrices);
            newSelectedPrices.delete(index);
            setSelectedPrices(newSelectedPrices);
        } else {
            setSelectedPrices(selectedPrices.add(index));
        }
    }

    const cuisineOptions = [{label: 'Chinese'},{ label: 'Japanese'},{label: 'Italian'}, {label: 'Mexican'}, {label: 'Indian'}]
    const [selectedCuisines, setSelectedCuisines] = useState(new Set());

    const handleCuisineSelect = (index) => {
        if (selectedCuisines.has(index)) {
            const newSelectedCuisines = new Set(selectedCuisines);
            newSelectedCuisines.delete(index);
            setSelectedCuisines(newSelectedCuisines);
        } else {
            setSelectedCuisines(selectedCuisines.add(index));
        }
    }

    const foodTypeOptions = [{label: 'Big meal'}, {label: 'Snack'}, {label: 'Drink'}, {label: 'Supper'}]
    const [selectedFoodTypes, setSelectedFoodTypes] = useState(new Set());

    const handleSelectedFoodTypes = (index) => {
        if (selectedFoodTypes.has(index)) {
            const newSelectedFoodTypes = new Set(selectedFoodTypes);
            newSelectedFoodTypes.delete(index);
            setSelectedFoodTypes(newSelectedFoodTypes);
        } else {
            setSelectedFoodTypes(selectedFoodTypes.add(index));
        }
    }

    const handleSubmit = () => {
        console.log(phoneNumber);
        console.log(selectedCuisines);
        console.log(selectedFoodTypes);
        console.log(selectedPrices);
    }

    return (
    <FormControl>
    <InputLabel htmlFor="phone">Phone number</InputLabel>
    <Input id="phone" value={phoneNumber} onChange={handlePhoneNumber}/>
    <FormHelperText>Your phone number will be shared with your matches.</FormHelperText>
<br/>
    <Typography variant='body' align="left">Prices</Typography>
    <MultiSelect list={priceOptions} handleChange={handlePriceSelect} />
    <br/>
    <Typography variant='body' align="left">Cuisines</Typography>
    <MultiSelect list={cuisineOptions} handleChange={handleCuisineSelect} />
    <br/>
    <Typography variant='body' align="left">Meal types</Typography>
    <MultiSelect list={foodTypeOptions} handleChange={handleSelectedFoodTypes} />
    <br/>

    <FormHelperText>Your current location will be used to generate matches.</FormHelperText>

<Button variant='contained' onClick={handleSubmit}>Request a match</Button>

  </FormControl>);
}