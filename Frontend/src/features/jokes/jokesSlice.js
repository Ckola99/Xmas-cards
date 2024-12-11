import { createSlice } from '@reduxjs/toolkit';
import jokes from '../../../jokes.json';

const initialState = {
	allJokes: jokes,
	currentJoke: null,
	categoryFilter: 'all'
}

// console.log("Imported jokes: ", jokes)
// console.log("all jokes: ", initialState.allJokes )

const jokesSlice = createSlice({
	name: 'jokes',
	initialState,
	reducers: {
		generateRandomJoke: (state) => {
			const filteredJokes = state.categoryFilter === 'all'
				? state.allJokes
				: state.allJokes.filter(joke => joke.category === state.categoryFilter);

			console.log("Filtered jokes: ", filteredJokes.map(joke => ({ ...joke })));

			const randomIndex = Math.floor(Math.random() * filteredJokes.length);
			const joke = { ...filteredJokes[randomIndex] }; // Copy joke without proxies

			state.currentJoke = joke;
		},
		setCategoryFilter: (state, action) => {
			state.categoryFilter = action.payload;
		}
	},
});

export const { generateRandomJoke, setCategoryFilter } = jokesSlice.actions;
export const selectCurrentJoke = (state) => state.jokes.currentJoke;
export const selectCategoryFilter = (state) => state.jokes.categoryFilter;
export default jokesSlice.reducer;
