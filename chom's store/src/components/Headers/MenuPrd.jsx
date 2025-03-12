import { Grid, Menu, MenuItem, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { accessoriesMenu, basketballShoes, casualShoesMenu, clothingMenu } from './MenuProducts';
import React from 'react';

const drawerWidth = 60;

const MenuPrd = ({ open, anchorEl, handleAccess, handleClose, handleClothing, handleShoes }) => {
    return (
        <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            MenuListProps={{ onMouseLeave: handleClose }}
            PaperProps={{
                style: {
                    width: '100%',
                },
            }}

        >
            <Grid container justifyContent={'center'} alignItems={'start'} sx={{ mt: 2 }} gap={6}>
                <Grid item >
                    <Typography sx={{ fontWeight: 'bold', textDecoration: 'underline', mb: 2 }}>CLOTHING</Typography>
                    {clothingMenu.map((item, idx) => {
                        return (
                            <motion.div
                                initial={{ x: -drawerWidth }}
                                animate={{ x: 0 }}
                                exit={{ x: -drawerWidth }}
                                transition={{ type: 'tween', duration: 0.5 }}
                                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <MenuItem key={idx} onClick={handleClothing} sx={{ ...fontSizeComon }}>
                                    {item.name}
                                </MenuItem>
                            </motion.div>
                        )
                    })}
                </Grid>

                <Grid item>
                    <Typography sx={{ fontWeight: 'bold', textDecoration: 'underline', mb: 2 }}>CASUAL SHOES</Typography>
                    {casualShoesMenu.map((item, idx) => {
                        return (
                            <motion.div
                                initial={{ x: -drawerWidth }}
                                animate={{ x: 0 }}
                                exit={{ x: -drawerWidth }}
                                transition={{ type: 'tween', duration: 0.5 }}
                                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <MenuItem key={idx} onClick={handleShoes} sx={{ ...fontSizeComon }}>
                                    {item.name}
                                </MenuItem>
                            </motion.div>
                        )
                    })}
                </Grid>

                <Grid item>
                    <Typography sx={{ fontWeight: 'bold', textDecoration: 'underline', mb: 2 }}>BASKETBALL SHOES</Typography>
                    {basketballShoes.map((item, idx) => {
                        return (
                            <motion.div
                                initial={{ x: -drawerWidth }}
                                animate={{ x: 0 }}
                                exit={{ x: -drawerWidth }}
                                transition={{ type: 'tween', duration: 0.5 }}
                                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <MenuItem key={idx} onClick={handleClose} sx={{ ...fontSizeComon }}>
                                    {item.name}
                                </MenuItem>
                            </motion.div>
                        )
                    })}
                </Grid>
                <Grid item>
                    <Typography sx={{ fontWeight: 'bold', textDecoration: 'underline', mb: 2 }}>ACCESSORIES</Typography>
                    {accessoriesMenu.map((item, idx) => {
                        return (
                            <motion.div
                                initial={{ x: -drawerWidth }}
                                animate={{ x: 0 }}
                                exit={{ x: -drawerWidth }}
                                transition={{ type: 'tween', duration: 0.5 }}
                                whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <MenuItem key={idx} onClick={handleAccess} sx={{ ...fontSizeComon }}>
                                    {item.name}
                                </MenuItem>
                            </motion.div>
                        )
                    })}
                </Grid>
                <Grid item>
                    <Typography sx={{ fontWeight: 'bold', textDecoration: 'underline', mb: 2 }}>CLEANING SERVICE</Typography>
                    <motion.div
                        initial={{ x: -drawerWidth }}
                        animate={{ x: 0 }}
                        exit={{ x: -drawerWidth }}
                        transition={{ type: 'tween', duration: 0.5 }}
                        whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <MenuItem onClick={handleClose} sx={{ ...fontSizeComon }}>
                            Bảng dịch vụ
                        </MenuItem>
                    </motion.div>
                </Grid>
            </Grid>
        </Menu>
    )
}

export default MenuPrd

const fontSizeComon = {
    fontSize: 14
}