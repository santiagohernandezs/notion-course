import { useState } from "react";

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

type Data = (`${string}.jpg` | `${string}.png` | `${string}.webp`)[];

export default function Carrousel(): JSX.Element {
  const IMAGES: Data = ["javier-expo.webp", "javier-expo-2.webp"];
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
      <div className="relative">
        <button
          onClick={prevImage}
          className="absolute bg-gray-200 rounded-full w-[10%] aspect-square top-1/2 left-2 flex justify-center items-center"
        >
          <Chevron />
        </button>
        <button
          onClick={nextImage}
          className="absolute rounded-full flex justify-center items-center top-1/2 right-2 w-[10%] aspect-square bg-gray-300 rotate-180"
        >
          <Chevron />
        </button>
        <img
          className="justify-self-center w-full"
          src={`${IMAGES[currentImage]}`}
          alt=""
        />
      </div>

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
    </Card>
  );
}
