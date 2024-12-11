import christmasTree from '../assets/christmas-tree-35.png';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const DonatePage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { joke, background, song } = location.state || {};


	const handlePreview = () => {
		const cardData = {
    			joke,
    			background,
    			song,
  		};

		navigate("/preview", { state: cardData } );
	}

	return (
		<div className="bg-homepage min-h-screen bg-cover bg-center px-10 py-8 ">
			{/* Go Back Button */}
      <button
        onClick={() => navigate(-1)} // Go back to the previous page
        className="text-red font-bold underline absolute top-2 left-3 hover:opacity-50 text-2xl"
      >
        &lt;
      </button>
			<p className="bg-white rounded-lg font-bold p-3 shadow-md text-[14px] mt-5">Before you share, would you like to make a difference by donating to Look Forward Creativity centre and children’s haven’s raffle competition. Your contribution supports a great cause, and you could win exciting prizes!</p>
			<img src={christmasTree} alt="Christmas Tree" />
			<a href="https://www.flexibreaks.co.za/Raffle/CompetitionList" target="_blank" rel="noopener noreferrer"><button  className="bg-amber-500 text-white font-bold w-full border rounded-full p-2 mb-4"> Donate </button> </a>
			<button  onClick={handlePreview} className="bg-red text-white font-bold w-full rounded-full p-2">Preview & Share</button>
		</div>
	)
}

export default DonatePage;
