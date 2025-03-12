import { Accordion, AccordionDetails, AccordionSummary, Divider, Grid, Typography } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'

export default function Categories() {
  return (
    <>
          <Typography sx={{ ...styleTitle }}>DANH MỤC</Typography>
          <Grid sx={{ mr: 5, mt: 2 }}>
              <Accordion sx={{ ...styleAccrodin }}>
                  <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                  >
                      CLOTHING (18)
                  </AccordionSummary>
                  <AccordionDetails>
                      <Accordion sx={{ ...styleAccrodin }}>
                          <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1d-content"
                              id="panel1d-header"
                          >
                              TOP & T-SHIRTS (35)
                          </AccordionSummary>
                          <AccordionDetails>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                              malesuada lacus ex, sit amet blandit leo lobortis eget.
                          </AccordionDetails>
                      </Accordion>
                      <Accordion sx={{ ...styleAccrodin }}>
                          <AccordionSummary
                              expandIcon={<ExpandMoreIcon />}
                              aria-controls="panel1d-content"
                              id="panel1d-header"
                          >
                              SHORTS & PANTS (3)
                          </AccordionSummary>
                          <AccordionDetails>
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                              malesuada lacus ex, sit amet blandit leo lobortis eget.
                          </AccordionDetails>
                      </Accordion>
                  </AccordionDetails>
              </Accordion>
              <Accordion sx={{ ...styleAccrodin }}>
                  <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                  >
                      CASUAL SHOES (60)
                  </AccordionSummary>
                  <AccordionDetails>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                      malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </AccordionDetails>
              </Accordion>
              <Accordion sx={{ ...styleAccrodin }}>
                  <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                  >
                      BASKETBALL SHOES (58)
                  </AccordionSummary>
                  <AccordionDetails>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                      malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </AccordionDetails>
              </Accordion>
              <Accordion sx={{ ...styleAccrodin }}>
                  <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                  >
                      ACCESSORIES (24)
                  </AccordionSummary>
                  <AccordionDetails>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                      malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </AccordionDetails>
              </Accordion>
              <Accordion sx={{ ...styleAccrodin }}>
                  <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1d-content"
                      id="panel1d-header"
                  >
                      CLEANING SERVICE
                  </AccordionSummary>
                  <AccordionDetails>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                      malesuada lacus ex, sit amet blandit leo lobortis eget.
                  </AccordionDetails>
              </Accordion>
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

const styleAccrodin = {
    border: 'none',
    boxShadow: 'none',
}