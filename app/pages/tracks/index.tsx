import PageContainer from '@/components/Layouts/PageContainer';
import TrackList from '@/components/TrackList';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { NextThunkDispatch, wrapper } from '@/store';
import { fetchTracks, searchTracks } from '@/store/action-creators/track';
import { ITrack } from '@/types/track';
import { Box, Button, Card, Grid, TextField } from '@mui/material';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';

const index = () => {
   const router = useRouter()
   const [query, setQuery] = useState<string>('');
   const { tracks, error } = useTypedSelector(state => state.track)
   const [timer, setTimer] = useState<any| null>(null);
   const dispatch = useDispatch() as NextThunkDispatch
   
   const search = async (e: ChangeEvent<HTMLInputElement>)=>{
      setQuery(e.target.value)
      if(timer){
          clearTimeout(timer)
         }
         setTimer(
            setTimeout(async ()=>{
               await dispatch(searchTracks(e.target.value))
            },500)
         )
   }

   if (error) {
      return <h1>{error}</h1>
   }

   return (
      <>
      <PageContainer title='Список треков - музыкальная площадка'/>
      <Grid container justifyContent='center' >
         <Card style={{ width: 900 }}>
            <Box p={2}>
               <Grid container justifyContent='space-between'>
                  <h1>
                     Список треков
                  </h1>
                  <Button onClick={() => router.push('/tracks/create')}>Загрузить</Button>
               </Grid>
            </Box>
            <TextField fullWidth value={query} onChange={search}/>
            <TrackList tracks={tracks} />
         </Card>
      </Grid>
      </>
      
   );
};

export default index;

export const getServerSideProps = wrapper.getServerSideProps(
   store => async () =>
   {
       const dispatch = store.dispatch as NextThunkDispatch;
       await dispatch(fetchTracks());

       return { props: {} }
   }
);