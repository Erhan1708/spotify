import { TrackAction, TrackActionTypes } from "@/types/track"
import axios from "axios"
import { Dispatch } from "react"

export const fetchTracks = () => {
   return async (dispatch: Dispatch<TrackAction>) => {
      try {
         const response = await axios.get("http://localhost:5000/tracks")
         dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
      } catch (err) {
         dispatch({type: TrackActionTypes.FETCH_TRACKS_ERROR, payload:'Произошла ошибка при загрузке треков'})
      }
   }
}