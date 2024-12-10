import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";

const PreviewPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { joke, background, song } = location.state || {};


	const userData = window.localStorage.getItem('userInfo')
	const parsedData = userData ? JSON.parse(userData) : null;
	const name = parsedData ? parsedData.preferredName : null;


	// Download the card as a PNG
	const handleDownloadPNG = () => {
		const cardElement = document.getElementById("card-preview");
		htmlToImage.toPng(cardElement).then((dataUrl) => {
			saveAs(dataUrl, "xmas-card.png");
		});
	};

	// Share the card via a link
	const handleShare = () => {
		const shareUrl = `${
			window.location.origin
		}/shared?data=${encodeURIComponent(
			JSON.stringify({ joke, background, song })
		)}`;
		navigator.clipboard.writeText(shareUrl);

		alert("Link copied to clipboard!");
	};

	return (
		<div className="bg-[#000000] min-h-screen p-5">
			<button
				onClick={() => navigate(-1)} // Go back to the previous page
				className="text-red font-bold underline absolute top-2 left-3 hover:opacity-50"
			>
				&lt;
			</button>
			<h1 className="font-coming-soon text-white font-bold text-2xl text-center w-full mt-3 mb-3">
				Here's your Xmas Card!
			</h1>

			{/* Created card preview */}
			<div
				id="card-preview"
				className="min-h-[560px] min-w-[300px]"
				style={{
					background: background
						? `no-repeat center/cover ${background}`
						: "black",
				}}
			>
				<p
						className={`${
							background?.includes(
								"1.png"
							)
								&& "text-white text-center "
						} pt-[240px] mb-5 px-5 font-bold text-center ${ background?.includes(
								"3.png"
							) && "pt-[180px] px-8 text-white" } ${ background?.includes(
								"4.png"
							) && "pt-[260px] px-5 text-red" } ${ background?.includes("2.png") && " text-white " } `}
					>
						{joke?.text} <span className="block text-amber-500">- from {name}</span>
				</p>
			</div>

			<p className="text-red font-bold w-full text-center"> Please note downloads may take a second, sharing the card includes jingle.</p>

			{/* Action buttons */}
			<div className="flex w-full gap-2 mt-5">

				<button
					onClick={handleDownloadPNG}
					className="w-full text-white border border-white font-bold rounded-full p-2"
				>
					Save PNG
				</button>
				<button
					onClick={handleShare}
					className="w-full text-white border border-white font-bold rounded-full p-2"
				>
					Share Card
				</button>
			</div>
		</div>
	);
};

export default PreviewPage;
