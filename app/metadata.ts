import type { Metadata } from "next";

export const metadata: Metadata = {
	title: {
		default: "Boundless - Decentralized Crowdfunding on Stellar",
		template: "%s | Boundless"
	},
	description: "Boundless is a decentralized crowdfunding platform built on the Stellar blockchain. Create, support, and manage projects with transparent funding through Soroban smart contracts.",
	keywords: ["boundless", "stellar", "crowdfunding", "blockchain", "soroban", "decentralized", "smart contracts", "funding", "crypto"],
	authors: [{ name: "Boundless Team" }],
	creator: "Boundless",
	publisher: "Boundless",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL('https://boundlessfi.xyz'),
	alternates: {
		canonical: '/',
		languages: {
			'en-US': '/en-us',
		},
	},
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: 'https://boundlessfi.xyz',
		title: 'Boundless - Decentralized Crowdfunding on Stellar',
		description: 'Boundless is a decentralized crowdfunding platform built on the Stellar blockchain. Create, support, and manage projects with transparent funding through Soroban smart contracts.',
		siteName: 'Boundless',
		images: [
			{
				url: '/og-image.png',
				width: 1200,
				height: 630,
				alt: 'Boundless - Decentralized Crowdfunding Platform',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Boundless - Decentralized Crowdfunding on Stellar',
		description: 'Boundless is a decentralized crowdfunding platform built on the Stellar blockchain. Create, support, and manage projects with transparent funding through Soroban smart contracts.',
		images: ['/og-image.png'],
		creator: '@boundless_fi',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	verification: {
		google: 'FW_PQArkBMP2C6mT1F-3rYPVDtNEK8kcsam-tAZEHoM',
		yandex: '04b995eba222dd7d',
	},
}; 
