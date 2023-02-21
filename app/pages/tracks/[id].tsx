import PageContainer from '@/components/Layouts/PageContainer';
import { useInput } from '@/hooks/useInput';
import { ITrack } from '@/types/track';
import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

export const getServerSideProps : GetServerSideProps = async ({params}) =>{
    const res = await axios.get('http://localhost:2000/tracks/' + params?.id)
    return {
        props: {
            serverTrack: res.data
        }
    }

}

const TrackPage = ({serverTrack} :any) => {
   const [track, setTrack] = useState<ITrack>(serverTrack)
   const router = useRouter()
   const username = useInput('')
   const text = useInput('')

   const addComment = async () => {
      try{
         const res = await axios.post('http://localhost:2000/tracks/comment', {
         username: username.value,
         text: text.value,
         trackId: track._id
      })
      setTrack({...track, comments:[...track.comments, res.data]})
   }catch (e){
      console.log(e)
   }
}

   return (
      <div>
         <PageContainer 
         title={"Музыкальная площадка - " + track.name + " - " + track.artist}
         keywords={'Музыка, артисты, ' + track.name + ", " + track.artist}
         />
         <Button
            variant={'outlined'}
            style={{ fontSize: 15 }}
            onClick={() => router.push('/tracks')}>
            К списку
         </Button>
         <Grid container style={{ margin: '20px 0' }}>
            <img src={'http://localhost:2000/' + track.picture} width={150} height={150} alt="" />
            <div style={{ marginLeft: 30 }}>
               <h1>{track.name}</h1>
               <h4>{track.artist}</h4>
               <p>{track.listens}- прослушиваний </p>
            </div>
         </Grid>
         <h1>Текст к треку</h1>
         <p>{track.text}</p>
         <Grid container>
            <h1>Комментарий</h1>
            <TextField
               label="Ваше имя"
               fullWidth
               {...username}
            />
            <TextField
               label="Ваш комментарий"
               fullWidth
               multiline
               rows={4}
               {...text}
            />
            <Button onClick={addComment}>Отправить</Button>
         </Grid>
         <div>
            {track.comments.map((comment : any) => {
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