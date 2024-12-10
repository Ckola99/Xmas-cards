import { createSlice } from "@reduxjs/toolkit";
import songsData from '../../../songs.json'

const initialState = {
	songs: songsData,
	selectedSong: null
}


const songsSlice = createSlice({
	name: 'songs',
	initialState,
	reducers: {
		selectSong: (state, action) => {
			state.selectedSong = state.songs.find(song => song.id === action.payload)
		}
	}
})

export const { selectSong } = songsSlice.actions;
export const  selectSongs = (state) => state.songs.songs;
export default songsSlice.reducer;
