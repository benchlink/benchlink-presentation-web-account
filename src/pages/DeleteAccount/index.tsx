import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import LogoIcon from "@/assets/icons/benchlink-logo.svg?react";
import FormItem from "@/components/shared/FormItem";
import Button from "@/components/shared/atoms/Button";
import Input from "@/components/shared/atoms/Input";
import Typography from "@/components/shared/atoms/Typography";
import { ApiStatus } from "@/api/types/@shared";

const emailFormSchema = z.object({
	email: z
		.string()
		.min(1, { message: "Please enter the email" })
		.email({ message: "Invalid email format" }),
});

export type EmailFormValues = z.infer<typeof emailFormSchema>;

const DeleteAccount = () => {
	const [apiStatus, setApiStatus] = useState<ApiStatus>("idle");
	const [requestDelete, setRequestDelete] = useState(false);

	// const mockPasswordUpdateRequestStatus = async (uuid: string) => {
	// 	try {
	// 		setApiStatus("loading");
	// 		const result = await AuthService.patchPasswordUpdateRequestStatus({
	// 			uuid,
	// 		});
	// 		if (!result.requestId) {
	// 			throw new Error();
	// 		}

	// 		const emailVerifiedeResult =
	// 			await AuthService.getRequestNewPasswordVerificationStatus({
	// 				uuid,
	// 			});

	// 		if (!emailVerifiedeResult.id) {
	// 			throw new Error("Email verification failed");
	// 		}
	// 		setApiStatus("succeeded");
	// 		// navigate('/signin/forgot-password/enter-new-password');
	// 	} catch (error) {
	// 		if (error instanceof AxiosError && error.status === 406) {
	// 			// Error 처리
	// 			console.error("BenchlinkResponse 리턴. 잘못된/확인되지 않은 이메일");
	// 			console.error(error);
	// 		}
	// 		setApiStatus("failed");
	// 	}
	// };
	// useEffect(() => {
	// 	if (uuid) {
	// 		mockPasswordUpdateRequestStatus(uuid);
	// 	}
	// }, [uuid]);
	const {
		handleSubmit,
		register,
		formState: { errors, isValid },
		setError,
	} = useForm<EmailFormValues>({
		mode: "onSubmit",
		resolver: zodResolver(emailFormSchema),
		defaultValues: {
			email: "",
		},
	});

	const btnDisabled = Object.keys(errors).length > 0 || !isValid;

	const handleFormSubmit: SubmitHandler<EmailFormValues> = async ({
		email,
	}) => {
		try {
			setApiStatus("loading");
			console.log({ email });
			// const result = await NetworkService.getHostByInviteCode({ inviteCode });

			// if (!result.host) {
			// 	throw new Error("invalid invitation code");
			// }

			// setHost({
			// 	id: result.host.id,
			// 	firstName: result.host.firstName,
			// 	lastName: result.host.lastName,
			// 	credentials: result.host.credentials,
			// 	inviteCode,
			// });

			// setApiStatus("succeeded");
			// setHostInfoDrawerOpen(true);
			setRequestDelete(true);
		} catch (error) {
			setApiStatus("failed");
			setError("email", { message: "This account does not exist" });
		}
	};

	return (
		<div className="overflow-hidden" style={{ height: "100dvh" }}>
			<header className="bg-[#000000]">
				<div className="h-[58px] max-w-[694px] px-4  flex items-center justify-between mx-auto">
					<LogoIcon width={123} />
				</div>
			</header>
			<div
				className="flexCol items-center  px-5 mt-5 gap-6"
				style={{ height: `calc(100dvh - 58px)` }}
			>
				{requestDelete ? (
					<div className="flexCol gap-5">
						<Typography type="h2">We sent you an email</Typography>
						<Typography type="h4" className="font-normal">
							Please find the email in your inbox and finalize the deletion
							process.
						</Typography>
					</div>
				) : (
					<>
						<div className="flexCol gap-2 ">
							<Typography type="h2">Delete my account</Typography>
							<Typography type="caption2" className="text-gray-subText">
								Once you delete your Benchlink account, all your existing
								account information including your profile, network, and rewards
								will be gone and cannot be redeemed.
							</Typography>
						</div>
						<form
							onSubmit={handleSubmit(handleFormSubmit)}
							className="w-full space-y-5"
						>
							<FormItem
								label="Email (Benchlink account)"
								error={errors.email?.message}
								required
								initialFocus
							>
								<Input {...register("email")} />
							</FormItem>
							<div className="w-full bg-white outline-none text-center">
								<Button
									value="Request deletion"
									disabled={btnDisabled}
									loading={apiStatus === "loading"}
								/>
							</div>
						</form>
					</>
				)}
			</div>
		</div>
	);
};

export default DeleteAccount;
