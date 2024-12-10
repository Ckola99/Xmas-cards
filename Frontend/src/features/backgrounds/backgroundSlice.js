import { createSlice } from "@reduxjs/toolkit";
import backgrounds from "../../../backgrounds.json"

const initialState = {
	availableBackgrounds: backgrounds,
	selectedBackground: null,
}

const  backgroundsSlice = createSlice({
	name: 'backgrounds',
	initialState,
	reducers: {
		selectBackground: (state, action) => {
			state.selectedBackground = action.payload;
		},
	},
});

export const { selectBackground } = backgroundsSlice.actions;
export default backgroundsSlice.reducer;
