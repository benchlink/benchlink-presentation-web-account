export type DeleteMemberPayload = {
	verificationId: string;
	email: string;
};

export type DeleteMemberResponse = {
	isDeleted: boolean
};
