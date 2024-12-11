import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import jokes from "../../jokes.json"; // Import jokes data
import backgrounds from "../../backgrounds.json"; // Import backgrounds data
import { useSelector, useDispatch } from "react-redux";
import { selectSongs } from "../features/songs/songsSlice";



const SharedCardPage = () => {
	const [searchParams] = useSearchParams(); // Access URL query parameters
	const [cardData, setCardData] = useState(null); // Store card data for rendering
	const [audio, setAudio] = useState(null); // Manage audio playback
	const [isPlaying, setIsPlaying] = useState(false); // Track playback state
	const navigate = useNavigate(); // Navigate between routes
	const location = useLocation(); // Access navigation state data
	const { joke, background, song } = location.state || {}; // Destructure state data if passed
	const songs = useSelector(selectSongs);


	const userData = window.localStorage.getItem("userInfo"); // Retrieve user info from localStorage
	const parsedData = userData ? JSON.parse(userData) : null; // Parse user data (if exists)
	const name = parsedData ? parsedData.preferredName : null; // Get user's preferred name






	// 1. Populate `cardData` from either state or query parameters
	useEffect(() => {
		// If data is passed via navigation state, prioritize it
		if (location.state?.cardData) {
			setCardData(location.state.cardData);
		} else {
			// Extract query parameters from URL
			const jokeId = searchParams.get("jokeId");
			const backgroundId = searchParams.get("backgroundId");
			const songId = searchParams.get("songId");
			const savedName = searchParams.get("savedName")

			// Map IDs to corresponding data from JSON files
			const joke = jokes.find((j) => j.id === Number(jokeId));
			const background = backgrounds.find(
				(b) => b.id === Number(backgroundId)
			);
			const song = songs.find((s) => s.id === Number(songId));

			// Set the `cardData` state with the retrieved data
			if (joke || background || song || savedName ) {
				setCardData({ joke, background, song, savedName });
			}
		}
	}, [location.state, searchParams]);

	// 2. Manage audio playback
	useEffect(() => {
		if (cardData?.song?.filePath) {
			const newAudio = new Audio(cardData.song.filePath); // Create new Audio object
			newAudio.loop = true; // Set audio to loop
			setAudio(newAudio); // Save audio object in state

			// Cleanup: Stop audio and reset when component unmounts or song changes
			return () => {
				newAudio.pause();
				newAudio.currentTime = 0;
			};
		}
	}, [cardData?.song]);

	// 3. Handle play/pause of the audio
	const handleTogglePlay = () => {
		if (audio) {
			if (isPlaying) {
				audio.pause(); // Pause audio if currently playing
			} else {
				audio.play(); // Play audio if currently paused
			}
			setIsPlaying(!isPlaying); // Toggle playback state
		}
	};

	// 4. Generate a shareable link with query parameters
	const generateShareableLink = () => {

		const strippedBackground = cardData?.background.replace(/^url\(|\)$/g, "");
		const backgroundInUse = backgrounds.find(b => strippedBackground === b.value);

		const queryParams = new URLSearchParams({
			jokeId: cardData?.joke?.id,
			backgroundId: backgroundInUse.id,
			songId: cardData?.song?.id,
			savedName: name
		}).toString();

		console.log('link', queryParams)

		return `${window.location.origin}/shared?${queryParams}`;
	};

	// 5. Copy the shareable link to the clipboard
	const handleShare = () => {
		const link = generateShareableLink();
		navigator.clipboard.writeText(link).then(() => {
			alert("Link copied to clipboard!");
		});
	};

	// JSX for rendering the page
	return (
		<div className="bg-black min-h-screen flex flex-col items-center justify-center text-white p-10">
			<button
				onClick={() => navigate(-1)} // Go back to the previous page
				className="text-red font-bold underline absolute top-2 left-3 hover:opacity-50 md:text-2xl"
			>
				&lt;
			</button>
			{/* Header */}
			<h1 className="text-xl font-bold mb-5 font-coming-soon">
				Your Xmas Card 🎄
			</h1>

			{/* Card Preview */}
			<div
				id="card-preview"
				className="h-[480px] w-[300px] flex items-center justify-center p-3 max-w-[400px] max-h-[800px]"
				style={{
    					background: cardData?.background
        					? (typeof cardData.background === 'object'
            						? `no-repeat center/cover url(${cardData.background.value})`
            						: `no-repeat center/cover ${cardData.background}`)
        					: "black", // Default to black if no background
				}}
			>
				{cardData?.joke && (
					<p
						className={`${
							background?.includes(
								"1.png"
							) &&
							"text-white text-center"
						} pt-[140px] mb-5 px-5 font-bold text-center ${
							background?.includes(
								"3.png"
							) &&
							"pt-[160px] px-8 text-white"
						} ${
							background?.includes(
								"4.png"
							) &&
							"pt-[300px] px-5 text-red"
						} ${
							background?.includes(
								"2.png"
							) && " text-white "
						} `}
					>
						{cardData.joke.text}{" "}
						<span className="block text-amber-500">
							- from {cardData.savedName || name }
						</span>
					</p>
				)}
			</div>

			{/* Play/Pause Music Button */}
			<button
				onClick={handleTogglePlay}
				className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded mt-5"
			>
				{isPlaying ? "Pause Music" : "Play Music"}
			</button>

			{/* Display currently playing song */}
			{cardData?.song && (
				<p className="mt-1 text-sm">
					Now playing: {cardData.song.name}
				</p>
			)}

			{/* Share Button */}
			<button
				onClick={handleShare}
				className="bg-red hover:bg-opacity-50 text-white font-bold py-2 px-5 rounded-full mt-5"
			>
				Copy Shareable Link
			</button>

			{/* Navigate Back */}
			<button
				onClick={() => navigate("/")}
				className="w-[200px] mx-auto underline text-amber-500 hover:opacity-50"
			>
				Create your XMAS card
			</button>
		</div>
	);
};

export default SharedCardPage;
