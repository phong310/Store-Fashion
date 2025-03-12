import { Divider, Grid, Typography, Checkbox, FormControlLabel, FormGroup, Box } from '@mui/material'
import React from 'react'

export default function ProductFilter() {

    const ProductArr = [
        {
            id: 1,
            name: 'Adidas'
        },
        {
            id: 2,
            name: 'Nike'
        }
    ]

  return (
    <>
          <Typography sx={{ ...styleTitle, mt: 4, mb: 2 }}>SẢN PHẨM</Typography>
          <FormGroup>
              {ProductArr.map((item, idx) => {
                  return (
                      <FormControlLabel key={idx} control={<Checkbox color="default" size="small" />} label={item.name} />
                  )
              })}
          </FormGroup>
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
