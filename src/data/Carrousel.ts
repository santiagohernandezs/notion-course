type Data = {
  title: string;
  default: `${string}.webp`;
  images: { src: `${string}.webp`; media: `(max-width: ${string}px)` }[];
}[];

export const IMAGES: Data = [
	{
		title: 'Galeria Universitaria',
		default: '/expo/javier-expo-1200.webp',
		images: [
			{ src: '/expo/javier-expo-500.webp', media: '(max-width: 425px)' },
			{
				src: '/expo/javier-expo-800.webp',
				media: '(max-width: 768px)'
			}
		]
	},
	{
		title: 'Galeria Universitaria 2',
		default: '/expo/javier-expo-2-1200.webp',
		images: [
			{ src: '/expo/javier-expo-2-500.webp', media: '(max-width: 425px)' },
			{
				src: '/expo/javier-expo-2-800.webp',
				media: '(max-width: 768px)'
			}
		]
	}
] as const
