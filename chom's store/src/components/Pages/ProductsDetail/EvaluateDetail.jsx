import { Box, Grid, Tab, Tabs } from '@mui/material';
import { TabContext, TabPanel } from '@mui/lab';
import React, { useState } from 'react';

const EvaluateDetail = () => {
    const [value, setValue] = useState('1');

    const handleChanges = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Grid
            sx={{
                mb: 10,
                px: { xs: 2, sm: 4, md: 10 },
                maxWidth: 1360,
                mx: 'auto'
            }}
        >
            <Box sx={{ overflowX: 'auto' }}>
                <Tabs
                    value={value}
                    onChange={handleChanges}
                    textColor="inherit"
                    indicatorColor="none"
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab label="Mô Tả" value="1" sx={styleTabs} />
                    <Tab label="Tab tùy chỉnh" value="2" sx={styleTabs} />
                    <Tab label="Đánh giá" value="3" sx={styleTabs} />
                </Tabs>
            </Box>
            <TabContext value={value}>
                <TabPanel value="1" sx={styleTabPanel}>Thông tin sản phẩm đang được cập nhật</TabPanel>
                <TabPanel value="2" sx={styleTabPanel}>Các nội dung hướng dẫn mua hàng viết ở đây</TabPanel>
                <TabPanel value="3" sx={styleTabPanel}>Đánh giá sản phẩm viết ở đây !</TabPanel>
            </TabContext>
        </Grid>

    )
}

export default EvaluateDetail


const styleTabs = {
    minWidth: 120,
    border: '1px solid #e1e1e1',
    borderBottom: 'none',
    fontWeight: 'bold',
    bgcolor: '#FBFBFB',
    '&.Mui-selected': {
        bgcolor: '#112637',
        color: 'white'
    }
}

const styleTabPanel = {
    border: '1px solid #e1e1e1 ',
    height: 200
}
