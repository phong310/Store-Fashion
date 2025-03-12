import { TabContext, TabPanel } from '@mui/lab'
import { Box, Divider, Grid, Tab, Tabs, Typography } from '@mui/material'
import React from 'react'
import ShoesItem from '../../ProductItems/ShoeItem';

export default function TopFeature() {

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Typography variant='h4' sx={{ textAlign: 'center', mt: 6, fontWeight: 'bold' }}>TOP NỔI BẬT</Typography>
            <Grid container justifyContent={'center'} sx={{ mt: 2 }}>
                <Grid item>
                    <Box>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            textColor="inherit"
                            indicatorColor="none"
                        >
                            <Tab label="BASKETBALL SHOES" value="1" sx={{ ...cusmTabActive }} />
                            <Divider orientation="vertical" flexItem sx={{ ...dividerTab }} />
                            <Tab label="KYRIE IRVING" value="2" sx={{ ...cusmTabActive }} />
                            <Divider orientation="vertical" flexItem sx={{ ...dividerTab }} />
                            <Tab label="JORDAN SHOES" value="3" sx={{ ...cusmTabActive }} />
                            <Divider orientation="vertical" flexItem sx={{ ...dividerTab }} />
                            <Tab label="PAUL GEORGE" value="4" sx={{ ...cusmTabActive }} />
                            <Divider orientation="vertical" flexItem sx={{ ...dividerTab }} />
                            <Tab label="DAME LILLARD" value="5" sx={{ ...cusmTabActive }} />
                        </Tabs>
                    </Box>
                </Grid>
                <TabContext value={value}>
                    <TabPanel value="1">
                        <Grid sx={{px: 30}}>
                            <ShoesItem />
                        </Grid>
                    </TabPanel>
                    <TabPanel value="2">
                    </TabPanel>
                    <TabPanel value="3">
                    </TabPanel>
                </TabContext>

            </Grid>
        </>

    )
}


const cusmTabActive = {
    '&.Mui-selected': {
        fontWeight: 'bold'
    }
}

const dividerTab = {
    height: 20,
    mt: 2,
    mx: 2
}