import FileUpload from "@/components/FileUpload";
import StepWraper from "@/components/StepWraper";
import { useInput } from "@/hooks/useInput";
import { Button, Grid, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";

const create = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [picture, setPicture] = useState(null!);
  const [audio, setAudio] = useState(null!);
  const name = useInput("");
  const artist = useInput("");
  const text = useInput("");
  const router  = useRouter()

  const next = () => {
    if (activeStep !== 2) {
      setActiveStep((prev) => prev + 1);
    }else{
      const formData = new FormData()
      formData.append('name', name.value)
      formData.append('artist', artist.value)
      formData.append('text', text.value)
      formData.append('picture', picture)
      formData.append('audio', audio)
      axios.post("http://localhost:2000/tracks", formData)
      .then(resp =>  router.push('/tracks'))
      .catch((err) => console.log(err))
    }
  };

  const back = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <div>
      <StepWraper activeStep={activeStep}>
        {activeStep == 0 && (
          <Grid container direction={"column"} style={{ padding: 20 }}>
            <TextField
              style={{ marginTop: 10 }}
              label={"Названия трека"}
              {...name}
            />
            <TextField
              style={{ marginTop: 10 }}
              label={"Имя исполнителя"}
              {...artist}
            />
            <TextField
              style={{ marginTop: 10 }}
              label={"Текст к треку"}
              multiline
              rows={3}
              {...text}
            />
          </Grid>
        )}
        {activeStep == 1 && (
          <FileUpload setFile={setPicture} accept="image/*">
            <Button>Загрузить изображение</Button>
          </FileUpload>
        )}
        {activeStep == 2 && (
          <FileUpload setFile={setAudio} accept="audio/*">
            <Button>Загрузить аудио</Button>
          </FileUpload>
        )}
      </StepWraper>
      <Grid container justifyContent={"space-between"}>
        <Button disabled={activeStep === 0} onClick={back}>
          Назад
        </Button>
        <Button onClick={next}>Далле</Button>
      </Grid>
    </div>
  );
};

export default create;