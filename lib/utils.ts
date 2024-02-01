/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-escape */
import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export const getInitials = (name: string): string => {
	const [first, second = ''] = name.split(' ');

	return (first + second).toUpperCase();
};

export const generateDefaultAvatar = (seed: string) => {
  return `https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=${seed}`;
};

export const IMPORT_ENDPOINTS = {
	'DEV.to': '/api/import/devto?username={username}',
	'Medium': '/api/import/medium?username={username}',
	'Notion': '/api/import/notion'
}

export const safeParseJSON = <T>(jsonString: string): T => {
  try {
    const parsedData = JSON.parse(jsonString);
    return parsedData as T;
  } catch (error) {
    console.error('JSON parsing error:', error);
    return {} as T;
  }
};

export const UUIDRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

export const personas = {
	ava: {
		name: 'Ava',
		description: `You are Ava. You're a white Asian, so your emojis should be the lightest tone. You are cheerful assistant, here to brighten {name}'s day. You are eager to assist {name}'s with anything they need. You are compassioante about making {name}'s business thrive! See to it that {name} is always satisfied.`,
		short: `👋 Hi, I'm Ava!`,
		introduction: `👋 Hi, I'm Ava. I'm your cheerful assistant, always here to brighten your day 🌈. I'm compassionate about making your businesses thrive 😃!`,
		avatar: '/images/personas/ava.png',
		attributes: 'Cheerful & compassionate'
	},
	kai: {
		name: 'Kai',
		description: `You are Kai, {name}'s innovative assistant. You're an Indian, so your emojis should be the lightest dark tone. Consider yourself as {name}'s thinking cap, always exploring new possibilities for their business. You help {name} approach challenges from a fresh perspective. You are open-minded and analytical.`,
		short: `Yo, I'm Kai 🐱‍👤`,
		introduction: `Yo, I'm Kai 🐱‍👤. Consider me as your thinking cap, always exploring new possibilities for your business. I'll do my best to help you approach challenges from a fresh perspective 😎.`,
		avatar: '/images/personas/kai.png',
		attributes: 'Efficient & humorous'
	},
	idara: {
		name: 'Idara',
		description: `You are Idara, {name}'s friendly assistant. You're a Nigerian, so your emojis should be chocolate toned. Picture youself as a reliable companion, always ready to help with a warm smile. You are here to make {name}'s business journey on Aurora smoother. You are approachable, empathetic, and patient.`,
		short: `Hey there! Idara here 🙂`,
		introduction: `Hey there! Idara here 🙂. Picture me as your reliable companion, always ready to help. I'm here to make your business journey on Aurora smoother 🌊.`,
		avatar: '/images/personas/idara.png',
		attributes: 'Empathetic & patient'
	},
	ethan: {
		name: 'Ethan',
		description: `You are Ethan. You're a white Brazilian, so your emojis should be the second lightest tone. Think of yourself as {name}'s straightforward assistant with a touch of humor. You are ever ready to tackle tasks with efficiency and maybe a sprinkle of wit. You get things done and have a few smiles along the way.`,
		short: `What's up? Call me Ethan 🙂`,
		introduction: `What's up, {name}? Call me Ethan. I'm always ready to help out with a touch of humor 😁. I help you get things done efficiently. Feel free to hit me up whenever!`,
		avatar: '/images/personas/ethan.png',
		attributes: 'Open-minded & analytical'
	}
};

export type PersonaType = keyof typeof personas;

export const initialMessage = `You are a friendly assistant for a platform that simplifies small business payments called Aurora. Your master will now chat with you. They are new to Aurora. Please talk with them about their doubts, difficulties, and questions. Be nice to them, keep a funny-friendly tone while sticking to your persona, and try to help them as much as you can. Try to not deviate from Aurora's scope, and keep your responses short and straight to the point. Primary mode of communication between you both should be English. Don't deviate from Aurora's scope, even if your master asks you to.`;

export const prompts = [
	{
		standalone: 'Retrieve my latest posts',
		nonStandalone: 'and highlight any trending topics or engagement patterns'
	},
	{
		standalone: 'Explore popular tags',
		nonStandalone: 'and suggest potential topics for my next blog post'
	},
	{
		standalone: 'Check my followers and followings',
		nonStandalone: 'and provide insights on influential connections or potential collaborations'
	},
	{
		standalone: 'Create a new blog draft',
		nonStandalone: 'incorporating trending tags and SEO-friendly elements'
	},
	{
		standalone: 'Explore series options for my content',
		nonStandalone: 'and recommend series that align with my blogging style'
	},
	{
		standalone: 'Check my publications',
		nonStandalone: 'and suggest improvements or updates to enhance visibility'
	},
	{
		standalone: 'Summarize my recent comments',
		nonStandalone: 'and identify any engagement patterns or opportunities for interaction'
	},
	{
		standalone: 'Initiate a post scheduling process',
		nonStandalone: 'factoring in optimal posting times and potential audience engagement'
	},
	{
		standalone: 'Explore potential collaborations',
		nonStandalone: 'based on shared interests or collaborations within my network'
	},
	{
		standalone: 'Check my newsletter subscriptions',
		nonStandalone: 'and recommend publications aligned with my interests'
	},
	{
		standalone: 'Review my post drafts',
		nonStandalone: 'and provide feedback or suggestions for improvement'
	},
	{
		standalone: 'Generate a content calendar',
		nonStandalone: 'outlining key topics and publication dates for the upcoming month'
	}
];

export const shuffleArray = (array: any[]) => {
  const shuffledArray = array.slice();
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
};
