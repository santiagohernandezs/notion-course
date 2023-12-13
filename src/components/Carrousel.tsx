import { useState } from "react";

type Data = {
  title: string;
  image: `/${string}.png` | `/${string}.jpg`;
}[];

const Arrows = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="#0a85d1"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M18 4l3 3l-3 3"></path>
      <path d="M18 20l3 -3l-3 -3"></path>
      <path d="M3 7h3a5 5 0 0 1 5 5a5 5 0 0 0 5 5h5"></path>
      <path d="M21 7h-5a4.978 4.978 0 0 0 -3 1m-4 8a4.984 4.984 0 0 1 -3 1h-3"></path>
    </svg>
  );
};
// switch 
export default function Carrousel(): JSX.Element {
  const IMAGES: Data = [
    {
      title: "Dashboard",
      image: "/Mesa_de_trabajo_1.png",
    },
    {
      title: "Ideas",
      image: "/Mesa_de_trabajo_2.png",
    },
    {
      title: "Tareas",
      image: "/Mesa_de_trabajo_3.png",
    },
  ];
  const [currentImage, setCurrentImage] = useState<number>(0);
  const handleClick = (index: number) => setCurrentImage(index);

  const buttons = IMAGES.map((image, index) => (
    <button
      className="font-inter gap-2 py-1 px-2 text-base text-black-text opacity-80 focus:bg-gray-300 hover:bg-gray-200 rounded-md cursor-pointer"
      onClick={() => handleClick(index)}
    >
      {image.title}
    </button>
  ));

  return (
    <div className="flex flex-col gap-8 tablet/sm:gap-6 bg-[#f6f5f4] p-6 rounded-xl relative mt-16">
      <img
        className="absolute w-32 -top-20 right-10 tablet/sm:w-48 tablet/sm:-top-[124px] tablet/sm:right-10"
        src="/topPeekJ.png"
        alt="peek"
      />
      <div className="flex flex-col gap-2">
        <Arrows />
        <div className="flex flex-col">
          <h3 className="font-inter text-[#050505] font-semibold text-lg">
            Visualize, filter & sort any way you want
          </h3>
          <span className="block font-inter text-black-text">
            Show only tasks assigned to you, or items marked as urgent. Break
            down any project in the way that’s most helpful to you.
          </span>
        </div>
      </div>

      <img
        className="rounded-lg border border-gray-200 shadow-sm laptop/sm:min-h-[458px] laptop/sm:max-h-[458px]"
        src={IMAGES[currentImage].image}
        alt={`notion page ${currentImage}`}
      />

      <div className="flex items-center justify-center gap-4">{buttons}</div>
    </div>
  );
}
