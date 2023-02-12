import TrackList from '@/components/TrackList';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { NextThunkDispatch, wrapper } from '@/store';
import { fetchTracks } from '@/store/action-creators/track';
import { ITrack } from '@/types/track';
import { Box, Button, Card, Grid } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
   const dispatch = store.dispatch as NextThunkDispatch
   await dispatch(fetchTracks())
 })

const index = () => {
   const router = useRouter()
   const { tracks, error } = useTypedSelector(state => state.track)
   
   if (error) {
      return <h1>{error}</h1>
   }

   return (
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
            <TrackList tracks={tracks} />
         </Card>
      </Grid>
   );
};

export default index;