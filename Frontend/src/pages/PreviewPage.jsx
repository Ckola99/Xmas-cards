import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import * as htmlToImage from "html-to-image";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import christmasTree from '../assets/christmas-tree-35.png';

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
  		html2canvas(cardElement).then((canvas) => {
    			canvas.toBlob((blob) => {
      				saveAs(blob, "xmas-card.png");
    			});
  		});
	};

	// Share the card via a link
	const handleShare = () => {
		const cardData = {
    			joke,
    			background,
    			song,
  		};

		navigate("/shared", {
      			state: { cardData },
    		});
	};

	return (
		<div className="bg-[#000000] min-h-screen p-5">
			<button
				onClick={() => navigate(-1)} // Go back to the previous page
				className="text-red font-bold underline absolute top-2 left-3 hover:opacity-50 text-2xl"
			>
				&lt;
			</button>
			<h1 className="font-coming-soon text-white font-bold text-2xl md:text-3xl text-center w-full mt-3 mb-5">
				Here's your Xmas Card!
			</h1>

			{/* Created card preview */}
			<div className="md:grid md:grid-cols-2 md:max-w-[95%] md:mx-auto md:place-items-center mb-2">
				<div className="hidden md:flex md:flex-col md:w-[306px] md:h-[414px] md:mb-[130px]">
					<p className="md:w-[308px] bg-white rounded-lg font-bold p-3 shadow-md text-[14px]">Before you share, would you like to make a difference by donating to Look Forward Creativity centre and children’s haven’s raffle competition. Your contribution supports a great cause, and you could win exciting prizes!</p>
					<img src={christmasTree} alt="Christmas Tree" />
					<a href="https://www.flexibreaks.co.za/Raffle/CompetitionList" target="_blank" rel="noopener noreferrer"><button  className=" bg-amber-500 text-white font-bold w-full border rounded-full p-2 mb-4 md:w-[280px]"> Donate </button> </a>
				</div>
				<div
				id="card-preview"
				className="min-h-[560px] min-w-[300px] max-w-[450px] md:h-[650px]"
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
							) && "pt-[300px] px-8 text-white" } ${ background?.includes(
								"4.png"
							) && "pt-[330px] px-5 text-red md:pt-[360px]" } ${ background?.includes("2.png") && " text-white " } ${ background?.includes("5.png") && " text-white text-shadow-glow" }`}
					>
						{joke?.text} <span className="block text-amber-500">- from {name}</span>
				</p>
			</div>
			</div>

			<p className="text-red font-bold w-full text-center"> Please note downloads may take a second, sharing the card includes your jingle.</p>

			{/* Action buttons */}
			<div className="flex w-full gap-2 mt-5 md:w-[700px] md:mx-auto">

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
