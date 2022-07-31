import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import './add-details.css'

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const tags = [
    "New", "Lightly Used", "Used", 
    "Spring", "Summer", "Fall", "Winter",
    "Mens", "Womens", "Unisex", 
    "Casual Wear", "Formal Wear", "Plus Size", "Street Wear", "Sports Wear",
    "Fitness and Sports Equipment", 
    "Handmade", "Gift",  "Vintage", 
    "Brown Merchandise", "Holiday", "Daily Essentials", "School Essentials", "Beauty products", 
    "Eco-friendly", "Cruelty-free", "Vegan", "BIPOC-made", 
    "Cute", "Cultural", "Artsy", "Custom"
]

function getStyles(tag, tagName, theme) {
  return {
    fontWeight:
      tagName.indexOf(tag) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function ChooseTags({handleInputChange, productTags}) {
  const theme = useTheme();

  const [selectedTags, setSelectedTags] = useState([]);
  const [selected, setSelected] = useState(false);

  const isSelected = (specificTag) => {
    if (selectedTags.includes(specificTag)) {
      return true
    } else {
      return false
    }
  }

  const handleClick = (event, specificTag) => {
    console.log(specificTag)
    if (!selectedTags.includes(specificTag)) {
      setSelectedTags([...selectedTags, specificTag])
      console.log("added to selectedTags")
    } else {
      setSelectedTags(selectedTags.filter(tag => 
        tag !== specificTag))
      console.log("removed from selectedTags")
    }
  }

  return (
    <div style={{ marginTop: '20px', marginLeft: '40px', marginRight: '20px', fontSize: "1.6vw" }}>
        <div>
          Add Tags 🏷
        </div>
        <div style={{ marginTop: "10px" }}>
          {
            tags.map(tag =>
              <Chip
                label={tag}
                onClick={event => handleClick(event, tag)}
                color={isSelected(tag) ? "primary" : "default"}
                className="clickableTags"
              />)
          }

        {/* <FormControl sx={{ width: 400 }}>
            <InputLabel id="demo-multiple-chip-label">Tags</InputLabel>
            <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                className="details-text"
                multiple
                name="productTags"
                value={productTags}
                onChange={handleInputChange}
                input={<OutlinedInput id="select-multiple-chip" label="Tags" />}
                renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                        <Chip key={value} label={value} />
                    ))}
                    </Box>
                )}
                MenuProps={MenuProps}
                >
                {tags.map((tag) => (
                    <MenuItem
                        key={tag}
                        value={tag}
                        style={getStyles(tag, productTags, theme)}
                    >
                        {tag}
                    </MenuItem>
                ))}
            </Select>
        </FormControl> */}
        </div>
    </div>
  );
}

export default ChooseTags