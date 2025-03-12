import { Divider, Grid, Typography, Checkbox, FormControlLabel, FormGroup, Box } from '@mui/material'
import React from 'react'

export default function OutstandingPrd() {
  return (
    <>
        <Grid>
              <Typography sx={{ ...styleTitle, mt: 4, mb: 2 }}>SẢN PHẨM NỔi BẬT</Typography>
        </Grid>
        <Grid container justifyContent={'space-between'} alignItems={'flex-start'} sx={{ maxWidth: 240}}>
            <Grid item xs={2}>
                  <img src='https://bizweb.dktcdn.net/thumb/small/100/427/393/products/81fd8d1f-4637-48d7-8253-d5185b770e40-jpeg-1677552380047.jpg?v=1677552385603'/>
            </Grid>
            <Grid item xs={7}>
                  <Typography sx={{ ...styleText }}>PG6 "BLACK MINT" - DC1974-001</Typography>
                  <Typography sx={{ ...styleText, mt:2, fontWeight:'bold' }}>4.550.000₫</Typography>
            </Grid>
        </Grid>
          <Grid sx={{ mr: 5, mt: 4 }} >
              <Divider />
          </Grid>
          <Grid sx={{mt: 4, mb: 2}}>
                <img src='https://bizweb.dktcdn.net/100/427/393/themes/820878/assets/aside_banner.png?1702732161008' style={{height:'auto', width: 260}}/>
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

const styleText = {
    fontSize: 14
}