import { useActions } from '@/hooks/useActions';
import { ITrack } from '@/types/track';
import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { Card, Grid, IconButton } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

interface TrackItemProps {
   track: ITrack;
   active?: boolean;
}

const TrackItem:FC<TrackItemProps> = ({track, active = false}) => {
   const router = useRouter()
   const {pauseTrack, playTrack, setActiveTrack}= useActions()

   const play = (e: { stopPropagation: () => void; }) => {
      e.stopPropagation()
      setActiveTrack(track)
      playTrack()
   }

   return (
      <Card className="track" onClick={()=>router.push('/tracks/' + track._id)}>
         <IconButton onClick={play}>
            {!active ? <PlayArrow/>: <Pause/>}
         </IconButton>
         <Image width={70} height={70} src={track.picture} alt=""/>
         <Grid container direction='column' style={{width:200, margin: '0 20px'}}>
            <p><b>{track.name}</b></p>
            <p style={{fontSize:12, color: 'gray'}}>{ track.artist}</p>
         </Grid>
         {active && <div>02:42 / 03:22</div>}
         <IconButton onClick={(e)=> e.stopPropagation()} style={{marginLeft: 'auto'}}>
            <Delete/>
         </IconButton>
      </Card>
   );
};

export default TrackItem;