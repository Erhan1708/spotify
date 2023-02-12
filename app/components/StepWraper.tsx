import { steps } from '@/constants';
import { Card, Container, Grid, Step, StepLabel, Stepper } from '@mui/material';
import React, { FC, ReactNode } from 'react';

interface StepWraperProps {
   activeStep: number;
   children: ReactNode;
}

const StepWraper: FC<StepWraperProps> = ({ activeStep, children }) => {
   return (
      <Container>
         <Stepper activeStep={activeStep}>
            {
               steps.map((step, i) => {
                  return (
                     <Step key={i} completed={activeStep > i}>
                        <StepLabel>
                           {step}
                        </StepLabel>
                     </Step>
                  )
               })
            }
         </Stepper>
         <Grid container justifyContent="center" style={{ margin: '70px 0', height: 270 }}>
            <Card style={{ width: 600, padding: '0 20px' }}>
               {children}
            </Card>
         </Grid>
      </Container>
   );
};

export default StepWraper;