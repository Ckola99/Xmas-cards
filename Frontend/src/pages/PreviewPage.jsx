const PreviewPage = () => {
	return (
		<div className="bg-[#000000] min-h-screen p-3">
			<h1 className="font-coming-soon">Here's your Xmas Card!</h1>
			<div></div>
			<div className="flex w-full gap-2">
				<button>Save PNG</button>
				<button>Save Video</button>
			</div>
			<button>Go back</button>
		</div>
	)
}

export default PreviewPage;
