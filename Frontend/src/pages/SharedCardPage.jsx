import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const SharedCardPage = () => {
	const [searchParams] = useSearchParams();
	const [cardData, setCardData] = useState(null);
	const [audio, setAudio] = useState(null);
	const [isPlaying, setIsPlaying] = useState(false);

	const userData = window.localStorage.getItem("userInfo");
	const parsedData = userData ? JSON.parse(userData) : null;
	const name = parsedData ? parsedData.preferredName : null;

	// Extract data from the URL query params
	useEffect(() => {
		const data = searchParams.get("data");
		if (data) {
			setCardData(JSON.parse(decodeURIComponent(data)));
			console.log(
				"Card Data:",
				JSON.parse(decodeURIComponent(data))
			);
		}
	}, [searchParams]);

	// Manage audio playback
	useEffect(() => {
		if (cardData?.song && cardData.song.filePath) {
			const newAudio = new Audio(cardData.song.filePath);
			newAudio.loop = true;
			setAudio(newAudio);

			// Clean up the audio object when the component unmounts or when the song changes
			return () => {
				newAudio.pause();
				newAudio.currentTime = 0;
			};
		}
	}, [cardData?.song]);

	const handleTogglePlay = () => {
		if (audio) {
			if (isPlaying) {
				audio.pause();
			} else {
				audio.play();
			}
			setIsPlaying(!isPlaying);
		}
	};

	if (!cardData) {
		return (
			<div className="text-white text-center mt-20">
				Loading...
			</div>
		);
	}

	const { joke, background, song } = cardData;

	return (
		<div
			className="bg-black min-h-screen flex flex-col items-center justify-center text-white p-10"
		>
			<h1 className="text-xl font-bold mb-5 font-coming-soon">
				Your Xmas Card 🎄
			</h1>
			<div
				id="card-preview"
				className="min-h-[480px] min-w-[300px] flex items-center justify-center p-3"
				style={{
					background: background
						? `no-repeat center/cover ${background}`
						: "black",
				}}
			>
				{joke && (
					<p className={`${
							background?.includes(
								"1.png"
							)
								&& "text-white text-center "
						} pt-[140px] mb-5 px-5 font-bold text-center ${ background?.includes(
								"3.png"
							) && "pt-[160px] px-8 text-white" } ${ background?.includes(
								"4.png"
							) && "pt-[260px] px-5 text-red" } ${ background?.includes("2.png") && " text-white " } `}>
						{joke.text} <span className="block text-amber-500">- from {name}</span>
					</p>
				)}
			</div>
			<button
				onClick={handleTogglePlay}
				className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded mt-5"
			>
				{isPlaying ? "Pause Music" : "Play Music"}
			</button>

			{song && (
				<p className="mt-1 text-sm">
					Now playing: {song.name}
				</p>
			)}
			<button className="w-[200px] mx-auto underline text-amber-500 hover:opacity-50">Create your XMAS card</button>
		</div>
	);
};

export default SharedCardPage;
