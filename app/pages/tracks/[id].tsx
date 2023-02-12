import { ITrack } from '@/types/track';
import { Button, Grid, TextField } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

const TrackPage = () => {
   const tracks: ITrack =
      { _id: '1', name: 'Junkie', artist: 'Redzed', text: 'сдезь должен быть текст', audio: '../../public/audio/redzed-junkie.mp3', picture: '/img/1608112525_redzed.jpg', comments: [] }
   const router = useRouter()
   return (
      <div>
         <Button
            variant={'outlined'}
            style={{ fontSize: 15 }}
            onClick={() => router.push('/tracks')}>
            К списку
         </Button>
         <Grid container style={{ margin: '20px 0' }}>
            <Image src={tracks.picture} width={150} height={150} alt="" />
            <div style={{ marginLeft: 30 }}>
               <h1>{tracks.name}</h1>
               <h4>{tracks.artist}</h4>
            </div>
         </Grid>
         <h1>Текст к треку</h1>
         <p>{tracks.text}</p>
         <Grid container>
            <h1>Комментарий</h1>
            <TextField
               label="Ваше имя"
               fullWidth
            />
            <TextField
               label="Ваш комментарий"
               fullWidth
               multiline
               rows={4}
            />
            <Button>Отправить</Button>
         </Grid>
         <div>
            {tracks.comments.map(comment => {
               return (
                  <div key={comment._id}>
                     <p><b>{comment.username}</b></p>
                     <p>{comment.text}</p>
                  </div>
               )
            })}
         </div>
      </div>
   );
};

export default TrackPage;