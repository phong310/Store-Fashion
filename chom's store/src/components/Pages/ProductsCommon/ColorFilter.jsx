import React from 'react'
import { Divider, Grid, Typography, Box, Slider, TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material'
import { pink } from '@mui/material/colors';
import { orange } from '@mui/material/colors';
import { brown } from '@mui/material/colors';
import { red } from '@mui/material/colors';
import { yellow } from '@mui/material/colors';
import { grey } from '@mui/material/colors';


export default function ColorFilter() {
  return (
    <>
      <Grid>
        <Typography sx={{ ...styleTitle, mt: 4, mb: 2 }}>MÀU SẮC</Typography>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="yellow"
          name="radio-buttons-group"
        >
          <FormControlLabel value="yellow" control={<Radio sx={{
            color: yellow[800],
            '&.Mui-checked': {
              color: yellow[600],
            },
          }} />} label="Vàng" />
          <FormControlLabel value="red" control={<Radio sx={{
            color: red[800],
            '&.Mui-checked': {
              color: red[600],
            },
          }} />} label="Đỏ" />
          <FormControlLabel value="white" control={<Radio sx={{
            color: grey[800],
            '&.Mui-checked': {
              color: grey[600],
            },
          }} />} label="Trắng" />
          <FormControlLabel value="brown" control={<Radio sx={{
            color: brown[800],
            '&.Mui-checked': {
              color: brown[600],
            },
          }} />} label="Nâu" />
          <FormControlLabel value="orange" control={<Radio sx={{
            color: orange[800],
            '&.Mui-checked': {
              color: orange[600],
            },
          }} />} label="Da Cam" />
          <FormControlLabel value="pink" control={<Radio sx={{
            color: pink[800],
            '&.Mui-checked': {
              color: pink[600],
            },
          }} />} label="Hồng" />
        </RadioGroup>
      </Grid>
      <Grid sx={{ mr: 5, mt: 4 }} >
        <Divider />
      </Grid>
    </>
  )
}

const styleTitle = {
  fontWeight: 'bold',
  fontSize: 18
}