export type PostVerifyEmailResponse = {
	requestId: string;
};

export type PostVerifyEmailPayload = {
	email: string;
};

export type GetVerifyEmailStatusParams = {
	uuid: string;
};

export type GetVerifyEmailStatusResponse = {
	id: string;
	email: string;
	isVerified: boolean;
};

export type PatchVerifyEmailStatusPayload = {
	uuid: string;
	password: string;
};

export type PatchVerifyEmailStatusResponse = PostVerifyEmailResponse;
