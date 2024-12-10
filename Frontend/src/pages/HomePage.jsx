import React, { useState } from "react";
import { selectSongs, selectSong } from "../features/songs/songsSlice";
import { selectBackground } from "../features/backgrounds/backgroundSlice";
import { useSelector, useDispatch } from "react-redux";
import { IoIosPlay, IoIosPause } from "react-icons/io";
import {
	selectCurrentJoke,
	generateRandomJoke,
} from "../features/jokes/jokesSlice";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
	const songs = useSelector(selectSongs);
	const selectedSong = useSelector((state) => state.songs.selectedSong);
	const dispatch = useDispatch();
	const [audio, setAudio] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false); // Track audio playing state
	const backgrounds = useSelector(
		(state) => state.backgrounds.availableBackgrounds
	);
	const selectedBackground = useSelector(
		(state) => state.backgrounds.selectedBackground
	);
	const currentJoke = useSelector(selectCurrentJoke);
	const navigate = useNavigate();

	const handleBackgroundChange = (bgValue) => {
		dispatch(selectBackground(bgValue));
	};

	const handleGenerateJoke = () => {
		dispatch(generateRandomJoke());
	};

	const handleSelectSong = (songId) => {
		dispatch(selectSong(songId));
		setIsPlaying(false); // Reset play state when a new song is selected
		if (audio) {
			audio.pause();
			setAudio(null);
		}
	};

	const handlePreviewPlay = (filePath) => {
		if (audio) {
			audio.pause(); // Pause current audio
			setAudio(null);
			setIsPlaying(false);
		} else {
			const newAudio = new Audio(filePath);
			newAudio.currentTime = 0; // Start from the beginning
			newAudio.play();
			setAudio(newAudio);
			setIsPlaying(true);

			newAudio.addEventListener("ended", () => {
				setIsPlaying(false); // Reset when audio ends
			});

			// Stop audio after 60 seconds if it’s still playing
			setTimeout(() => {
				newAudio.pause();
				setIsPlaying(false);
			}, 60000);
		}
	};

	const handleButtonClick = () => {
		if (window.matchMedia("(min-width: 768px)").matches) {
			navigate("/preview"); // Navigate to Preview page for md+ screens
		} else {
			navigate("/donate"); // Navigate to Donations page for smaller screens
		}
	};

	return (
		<div className="bg-homepage min-h-screen bg-cover bg-center py-3 px-5">
			<div className="relative w-full"> <button className="absolute left-0 underline text-red hover:text-opacity-50 font-bold" onClick={() => navigate(-1)}> &lt; </button> <h1 className="font-bold text-center text-xl mb-3">Card Generator</h1> </div>
			<div className="p-2 border border-red rounded-full w-[85%] mx-auto flex items-center">
				<select
					value={
						selectedSong
							? selectedSong.id
							: ""
					}
					onChange={(e) =>
						handleSelectSong(
							Number(e.target.value)
						)
					}
					className="bg-transparent appearance-none bg-[url('./assets/icon-chevron-down.svg')] bg-no-repeat bg-[center_right_24px] text-red-500 border-none outline-none w-full"
				>
					<option
						value=""
						className="w-full focus:none"
					>
						Select a Song
					</option>
					{songs.map((song) => (
						<option
							key={song.id}
							value={song.id}
							className="text-black"
						>
							{song.name}
						</option>
					))}
				</select>
				<button
					type="button"
					onClick={() =>
						selectedSong &&
						handlePreviewPlay(
							selectedSong.filePath
						)
					}
					className={`text-red ml-2 text-xl ${
						isPlaying ? "text-blue-500" : ""
					}`}
				>
					{isPlaying ? (
						<IoIosPause />
					) : (
						<IoIosPlay />
					)}
				</button>
			</div>

			<div
				className="min-w-[300px] mx-auto min-h-[480px] bg-black mt-3 relative flex flex-col items-center justify-center"
				style={{
					background: selectedBackground
						? selectedBackground.includes(
								"url"
						  )
							? `no-repeat center/cover ${selectedBackground}`
							: selectedBackground
						: "black",
				}}
			>
				{currentJoke ? (
					<p
						className={`${
							selectedBackground?.includes(
								"1.png"
							)
								&& "text-white text-center "
						} mt-[100px] mb-5 px-5 font-bold text-center ${ selectedBackground?.includes(
								"3.png"
							) && "mt-[160px] px-8 text-white" } ${ selectedBackground?.includes(
								"4.png"
							) && "mt-[250px] px-5 text-red" } ${ selectedBackground?.includes("2.png") && " text-white " } `}
					>
						{currentJoke.text}
					</p>
				) : (
					<p
						onClick={handleGenerateJoke}
						className={`${
							selectedBackground?.includes(
								"1.png"
							)
								? "cursor-pointer"
								: ""
						} ${selectedBackground?.includes("4.png") ? " mt-[200px] px-3 font-bold" : "" } text-white text-center`}
					>
						{ !currentJoke ? "Click here to generate new joke and select a background below" : ""}
					</p>
				)}
				{currentJoke && (<button onClick={handleGenerateJoke} className="bg-white p-2 rounded-full" >New Joke? </button>)}
			</div>

			<div className="my-3 flex mx-auto justify-between">
				{backgrounds.map((bg) => (
					<button
						key={bg.id}
						onClick={() =>
							handleBackgroundChange(
								bg.type ===
									"image"
									? `url(${bg.value})`
									: bg.value
							)
						}
						className="w-[50px] h-[70px] border-2 border-white"
						style={{
							background:
								bg.type ===
								"image"
									? `url(${bg.value}) no-repeat center/cover`
									: bg.value,
						}}
					></button>
				))}
			</div>

			<button onClick={handleButtonClick} className="bg-red h-[36px] w-[244px] mx-auto rounded-full text-white text-[14px] flex items-center justify-center hover:bg-opacity-50">
				Preview & Share
			</button>
		</div>
	);
};

export default HomePage;
