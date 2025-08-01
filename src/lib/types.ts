// src/lib/types.ts
export type SanityImage = {
	_id: string;
	url: string;
	metadata: {
		lqip: string; // low quality image placeholder
	};
};

export type SanityFile = {
	url: string;
};
