import { useState } from "react";
import { IMAGES } from "../data/Carrousel";

const Card = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <div className="relative flex flex-col items-center gap-8 rounded-xl bg-[#f6f5f4] px-6 py-8 tablet/sm:gap-12">
      {children}
    </div>
  );
};

const Chevron = (): JSX.Element => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-1/2"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 6l-6 6l6 6" />
    </svg>
  );
};

export default function Carrousel(): JSX.Element {
  const [currentImage, setCurrentImage] = useState<number>(0);

  const nextImage = () =>
    currentImage === IMAGES.length - 1
      ? setCurrentImage(0)
      : setCurrentImage(currentImage + 1);

  const prevImage = () =>
    currentImage === 0
      ? setCurrentImage(IMAGES.length - 1)
      : setCurrentImage(currentImage - 1);

  return (
    <Card>
      <div className="relative flex flex-col items-center gap-2">
        <button
          onClick={prevImage}
          className="absolute bg-gray-200 rounded-full w-[10%] aspect-square top-1/2 left-2 flex justify-center items-center"
          title="prev"
          aria-label="prev"
        >
          <Chevron />
        </button>
        <button
          title="next"
          aria-label="next"
          onClick={nextImage}
          className="absolute rounded-full flex justify-center items-center top-1/2 right-2 w-[10%] aspect-square bg-gray-300 rotate-180"
        >
          <Chevron />
        </button>
        {
          <picture>
            {IMAGES[currentImage].images.map((source: any, index: any) => (
              <source key={index} srcSet={source.src} media={source.media} />
            ))}
            <img
              className="rounded-lg border border-gray-200 shadow-sm w-full h-full laptop/sm:min-h-[458px]"
              src={IMAGES[currentImage].default}
              alt={`notion page ${currentImage}`}
            />
          </picture>
        }
        <span>{IMAGES[currentImage].title}</span>
        <div className="flex gap-2">
          {IMAGES.map((image, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${
                index === currentImage ? "bg-gray-500" : "bg-gray-300"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </Card>
  );
}
