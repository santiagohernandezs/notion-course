import { useState } from "react";
import { IMAGES } from "../data/Switcher";
import Arrows from "./Arrow";
import Card from './Card'

export default function Switcher(): JSX.Element {
	const [currentImage, setCurrentImage] = useState<number>(0)
	const handleClick = (index: number) => setCurrentImage(index)

	const buttons = IMAGES.map((image, index) => (
		<button
			className={`font-inter gap-2 py-1 px-2 text-sm font-medium text-black-text border border-black-default border-opacity-20 hover:bg-gray-100 rounded-md cursor-pointer transition-colors duration-75 ease-in-out ${
				currentImage === index ? 'bg-gray-200 opacity-100' : ''
			}`}
			onClick={() => handleClick(index)}
			key={index}
			lang='en'
		>
			{image.title}
		</button>
	))

	return (
		<Card styles='flex flex-col tablet/sm:gap-6 p-6 mt-16'>
			<img
				className='absolute w-32 -top-20 right-10 tablet/sm:w-48 tablet/sm:-top-[124px] tablet/sm:right-10'
				src='/doodles/topPeekJ.webp'
				alt='peek'
			/>
			<div className='flex flex-col gap-2'>
				<Arrows />
				<div className='flex flex-col'>
					<h3 className='font-inter text-[#050505] font-semibold text-lg'>
						Organiza, prioriza y personaliza
					</h3>
					<span className='block font-inter text-black-text'>
						Contruye tus propias páginas con bloques de contenido, dales el formato que quieras y
						organiza tu trabajo
					</span>
				</div>
			</div>

			<picture>
				{IMAGES[currentImage].images.map((source: any, index: any) => (
					<source key={index} srcSet={source.src} media={source.media} />
				))}
				<img
					className='rounded-lg border border-gray-200 shadow-sm w-full h-full laptop/sm:min-h-[458px]'
					src={IMAGES[currentImage].default}
					alt={`notion page ${currentImage}`}
				/>
			</picture>

			<div className='flex items-center justify-center gap-4'>{buttons}</div>
		</Card>
	)
}
