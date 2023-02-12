import React, {ChangeEvent, useEffect} from 'react';
import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import { ITrack } from '@/types/track';
import Image from 'next/image';
import TrackProgress from './TrackProgress';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { useActions } from '@/hooks/useActions';

let audio: any;

const Player = () => {
   const { pause, volume, active, duration, currentTime } = useTypedSelector(state => state.player)
   const {pauseTrack, playTrack, setCurrentTime, setDuration,setVolume ,setActiveTrack} = useActions()
   
   useEffect(() => {
      if (!audio) {
         audio = new Audio()
      } else {
         setAudio()
         play()
      }
    },[active])

   const setAudio = () => {
      if (active) {
         audio.src = active.audio
         audio.volume = volume / 100
         audio.onloadedmetadata = () => {
            setDuration(Math.ceil(audio.duration))
         }
         audio.ontimeupdate = () => {
            setCurrentTime(Math.ceil(audio.currentTime))
         }
      }
   }

   const play = () => {
      if (pause) {
         playTrack()
         audio.play()
      } else {
         pauseTrack()
         audio.pause()
      }
   }
   
   const changeVolume = (e: ChangeEvent<HTMLInputElement>) => {
      audio.volume = Number(e.target.value) / 100
      setVolume(Number(e.target.value))
   }
   const changeCurrentTime = (e: ChangeEvent<HTMLInputElement>) => {
      audio.currentTime = Number(e.target.value) 
      setCurrentTime(Number(e.target.value))
   }

   if (!active) {
      return null
   }

   return (
      <div className='player'>
         <IconButton onClick={play}>
            {pause ? <PlayArrow/>: <Pause/>}
         </IconButton>
         <Grid container direction='column' style={{ width: 200 ,margin: '0 20px' }}>
            {/* <Image src={tracks.picture} width={30} height={30} alt="" /> */}
            <div style={{ marginLeft: 30 }}>
               <p><b>{active?.name}</b></p>
               <p style={{fontSize:12, color:'gray'}}>{active?.artist}</p>
            </div>
         </Grid>
         <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} />
         <VolumeUp style={{ marginLeft: 'auto' }} />
         <TrackProgress left={volume} right={100} onChange={changeVolume} />
      </div>
   );
};

export default Player;