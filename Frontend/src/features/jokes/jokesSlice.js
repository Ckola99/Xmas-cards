import { createSlice } from '@reduxjs/toolkit';
import jokes from '../../../jokes.json';

const initialState = {
	allJokes : jokes,
	currentJoke: null
}

// console.log("Imported jokes: ", jokes)
// console.log("all jokes: ", initialState.allJokes )

const jokesSlice = createSlice({
	name: 'jokes',
	initialState,
	reducers: {
		generateRandomJoke: (state) => {
			const randomIndex = Math.floor(Math.random() * state.allJokes.length);
  			const joke = JSON.parse(JSON.stringify(state.allJokes[randomIndex])); // Convert to plain object
  			state.currentJoke = joke;
  			console.log("Current joke:", state.currentJoke); // Now logs a plain object
		},
	},
});

export const { generateRandomJoke } = jokesSlice.actions;
export const selectCurrentJoke = (state) => state.jokes.currentJoke;
export default jokesSlice.reducer;
