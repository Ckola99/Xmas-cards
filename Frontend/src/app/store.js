import { configureStore } from '@reduxjs/toolkit';
import songsReducer from '../features/songs/songsSlice'
import backgroundsReducer from '../features/backgrounds/backgroundSlice'
import jokesReducer from '../features/jokes/jokesSlice'

const store = configureStore({
	reducer: {
		songs: songsReducer,
		backgrounds: backgroundsReducer,
		jokes: jokesReducer,
	}
})

export default store;
