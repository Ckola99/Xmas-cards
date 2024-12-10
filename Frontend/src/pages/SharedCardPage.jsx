import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

const SharedCardPage = () => {
    const [searchParams] = useSearchParams();
    const [cardData, setCardData] = useState(null);
    const [audio, setAudio] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const navigate = useNavigate();

    const userData = window.localStorage.getItem("userInfo");
    const parsedData = userData ? JSON.parse(userData) : null;
    const name = parsedData ? parsedData.preferredName : null;

    // Check for cardData from URL query params or state
    useEffect(() => {
        // Retrieve data from URL if available
        const joke = searchParams.get("joke");
        const background = searchParams.get("background");
        const song = searchParams.get("song");

        // Set the card data from URL if available
        if (joke || background || song) {
            setCardData({
                joke: { text: joke },
                background,
                song: { filePath: song },
            });
        }
    }, [searchParams]);

    useEffect(() => {
        // If cardData is available, manage audio playback
        if (cardData?.song?.filePath) {
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

    const generateShareableLink = () => {
        // Create a query string with card data
        const cardData = {
            joke: cardData?.joke?.text,
            background: cardData?.background,
            song: cardData?.song?.filePath,
        };

        const queryParams = new URLSearchParams(cardData).toString();
        const shareableLink = `${window.location.origin}/shared?${queryParams}`;

        return shareableLink;
    };

    const handleShare = () => {
        const link = generateShareableLink();
        navigator.clipboard.writeText(link).then(() => {
            alert("Link copied to clipboard!");
        });
    };

    return (
        <div className="bg-black min-h-screen flex flex-col items-center justify-center text-white p-10">
            <h1 className="text-xl font-bold mb-5 font-coming-soon">Your Xmas Card 🎄</h1>
            <div
                id="card-preview"
                className="min-h-[480px] min-w-[300px] flex items-center justify-center p-3"
                style={{
                    background: cardData?.background
                        ? `no-repeat center/cover ${cardData.background}`
                        : "black",
                }}
            >
                {cardData?.joke && (
                    <p
                        className={`${
                            cardData?.background?.includes("1.png") && "text-white text-center"
                        } pt-[140px] mb-5 px-5 font-bold text-center ${
                            cardData?.background?.includes("3.png") && "pt-[160px] px-8 text-white"
                        } ${cardData?.background?.includes("4.png") && "pt-[260px] px-5 text-red"} ${
                            cardData?.background?.includes("2.png") && " text-white "
                        } `}
                    >
                        {cardData.joke.text} <span className="block text-amber-500">- from {name}</span>
                    </p>
                )}
            </div>
            <button
                onClick={handleTogglePlay}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-4 rounded mt-5"
            >
                {isPlaying ? "Pause Music" : "Play Music"}
            </button>

            {cardData?.song && <p className="mt-1 text-sm">Now playing: {cardData.song.name}</p>}

            <button
                onClick={handleShare}
                className="bg-red hover:bg-opacity-50 text-white font-bold py-2 px-5 rounded-full mt-5"
            >
                Copy Shareable Link
            </button>

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
