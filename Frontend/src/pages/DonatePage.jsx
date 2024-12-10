import christmasTree from '../assets/christmas-tree-35.png'

const DonatePage = () => {
	return (
		<div className="bg-homepage min-h-screen bg-cover bg-center px-10 py-8 ">
			<p className="bg-white rounded-lg font-bold p-3 shadow-md text-[14px]">Before you share, would you like to make a difference by donating to Look Forward Creativity centre and children’s haven’s raffle competition. Your contribution supports a great cause, and you could win exciting prizes!</p>
			<img src={christmasTree} alt="Christmas Tree" />

			<button className="bg-green text-white w-full font-bold rounded-full p-2 mx-auto mb-2"> Donate </button>
			<button className="bg-red text-white w-full font-bold rounded-full p-2 mx-auto"> Preview & Share </button>
		</div>
	)
}

export default DonatePage;
