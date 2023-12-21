type Data = {
  title: string;
  default: `${string}.webp`;
  images: { src: `${string}.webp`; media: `(max-width: ${string}px)` }[];
}[];

export const IMAGES: Data = [
  {
    title: "Dashboard",
    default: "/notion-page-1-1200.webp",
    images: [
      { src: "/notion-page-1-500.webp", media: "(max-width: 425px)" },
      {
        src: "/notion-page-1-800.webp",
        media: "(max-width: 768px)",
      },
    ],
  },
  {
    title: "Ideas",
    default: "/notion-page-2-1200.webp",
    images: [
      { src: "/notion-page-2-500.webp", media: "(max-width: 425px)" },
      {
        src: "/notion-page-2-800.webp",
        media: "(max-width: 768px)",
      },
    ],
  },
  {
    title: "Tareas",
    default: "/notion-page-3-1200.webp",
    images: [
      { src: "/notion-page-3-500.webp", media: "(max-width: 425px)" },
      {
        src: "/notion-page-3-800.webp",
        media: "(max-width: 768px)",
      },
    ],
  },
] as const;
