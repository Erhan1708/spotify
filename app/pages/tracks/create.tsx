import FileUpload from '@/components/FileUpload';
import StepWraper from '@/components/StepWraper';
import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';

const create = () => {
   const [activeStep, setActiveStep] = useState(0)
   const [picture, setPicture] = useState(null)
   const [audio, setAudio] = useState(null)

   const next = () => {
      if (activeStep !== 2) {
         setActiveStep(prev => prev + 1)
      }
   }

   const back = () => {
      setActiveStep(prev => prev - 1)
   }

   return (
      <div>
         <StepWraper activeStep={activeStep}>
            {activeStep == 0 &&
               <Grid container direction={"column"} style={{padding:20}}>
                  <TextField style={{marginTop:10}} label={"Названия трека"}/>
                  <TextField style={{marginTop:10}} label={"Имя исполнителя"}/>
                  <TextField style={{marginTop:10}} label={"Текст к треку"} multiline rows={3}/>
               </Grid>
            }
            {activeStep == 1 &&
               <FileUpload
                  setFile={setPicture}
                  accept='image/*'>
                  <Button>Загрузить изображение</Button>
               </FileUpload>
            }
            {activeStep == 2 &&
               <FileUpload
                  setFile={setAudio}
                  accept='audio/*'>
                  <Button>Загрузить аудио</Button>
               </FileUpload>
            }
         </StepWraper>
         <Grid container justifyContent={"space-between"}>
            <Button disabled={activeStep === 0} onClick={back}>Назад</Button>
            <Button onClick={next}>Далле</Button>
         </Grid>
      </div>
   );
};

export default create;