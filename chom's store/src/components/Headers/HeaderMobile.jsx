import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, MenuItem, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { basketballShoes, casualShoesMenu, clothingMenu } from './MenuProducts';
import { useNavigate } from 'react-router';

const HeaderMobile = ({
    handleClose,
    handleClothing,
    handleShoes
}) => {
    const drawerWidth = 20;
    const navigate = useNavigate()

    return (
        <Box sx={{
            display: { xs: 'block', md: 'block', lg: 'none' }, px: 2, maxHeight: 'calc(100vh - 100px)',
            overflowY: 'auto',
            my: 1
        }}>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={{ pl: 2 }}>MENU</Typography>
                </AccordionSummary>
                <AccordionDetails>

                    <Button sx={styleButtonAccordionItem} onClick={() => navigate('/')}>TRANG CHỦ</Button>

                    <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontWeight: 'bold', fontSize: 14 }}>SẢN PHẨM</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{ fontWeight: 'bold', textDecoration: 'underline', mb: 2 }}>CLOTHING</Typography>
                            {clothingMenu.map((item, idx) => {
                                return (
                                    <motion.div
                                        initial={{ x: -drawerWidth }}
                                        animate={{ x: 0 }}
                                        exit={{ x: -drawerWidth }}
                                        transition={{ type: 'tween', duration: 0.5 }}
                                        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <MenuItem key={idx} onClick={handleClothing} sx={{ ...fontSizeComon }}>
                                            {item.name}
                                        </MenuItem>
                                    </motion.div>
                                )
                            })}
                        </AccordionDetails>
                        <AccordionDetails>
                            <Typography sx={{ fontWeight: 'bold', textDecoration: 'underline', mb: 2 }}>CASUAL SHOES</Typography>
                            {casualShoesMenu.map((item, idx) => {
                                return (
                                    <motion.div
                                        initial={{ x: -drawerWidth }}
                                        animate={{ x: 0 }}
                                        exit={{ x: -drawerWidth }}
                                        transition={{ type: 'tween', duration: 0.5 }}
                                        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <MenuItem key={idx} onClick={handleShoes} sx={{ ...fontSizeComon }}>
                                            {item.name}
                                        </MenuItem>
                                    </motion.div>
                                )
                            })}
                        </AccordionDetails>
                        <AccordionDetails>
                            <Typography sx={{ fontWeight: 'bold', textDecoration: 'underline', mb: 2 }}>BASKETBALL SHOES</Typography>
                            {basketballShoes.map((item, idx) => {
                                return (
                                    <motion.div
                                        initial={{ x: -drawerWidth }}
                                        animate={{ x: 0 }}
                                        exit={{ x: -drawerWidth }}
                                        transition={{ type: 'tween', duration: 0.5 }}
                                        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <MenuItem key={idx} onClick={handleClose} sx={{ ...fontSizeComon }}>
                                            {item.name}
                                        </MenuItem>
                                    </motion.div>
                                )
                            })}
                        </AccordionDetails>
                        <AccordionDetails>
                            <Typography sx={{ fontWeight: 'bold', textDecoration: 'underline', mb: 2 }}>CLEANING SERVICE</Typography>
                            <motion.div
                                initial={{ x: -drawerWidth }}
                                animate={{ x: 0 }}
                                exit={{ x: -drawerWidth }}
                                transition={{ type: 'tween', duration: 0.5 }}
                                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <MenuItem onClick={handleClose} sx={{ ...fontSizeComon }}>
                                    Bảng dịch vụ
                                </MenuItem>
                            </motion.div>
                        </AccordionDetails>

                    </Accordion>

                    <Accordion sx={{ mt: 1 }}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontWeight: 'bold', fontSize: 14 }}>TIN TỨC</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Button sx={{ color: 'black' }}>WHAT'S NEW</Button> <br />
                            <Button sx={{ color: 'black' }}>REVIEW</Button> <br />
                            <Button sx={{ color: 'black' }}>UPCOMING</Button>
                        </AccordionDetails>
                    </Accordion>

                    <Button sx={{ ...styleButtonAccordionItem, mt: 1 }} onClick={() => navigate('/')}>SALE OUT</Button> <br />

                    <Button sx={styleButtonAccordionItem} onClick={() => navigate('/')}>LIÊN HỆ</Button> <br />

                    <Button sx={styleButtonAccordionItem} onClick={() => navigate('/')}>CHÔM MADE</Button>

                </AccordionDetails>
            </Accordion>
        </Box>
    )
}

export default HeaderMobile



const styleButtonAccordionItem = {
    width: '100%',
    justifyContent: 'flex-start',
    color: 'black',
    border: '1px solid #ddd',
    borderRadius: '4px',
    padding: '8px 16px',
    textTransform: 'none',
    marginBottom: '8px',
    fontWeight: 'bold'
    // backgroundColor: '#f9f9f9'
}

const fontSizeComon = {
    fontSize: 14
}
