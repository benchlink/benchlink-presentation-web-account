import { ApiStatus } from "@/api/types/@shared";
import LogoIcon from "@/assets/icons/benchlink-logo.svg?react";
import FormItem from "@/components/shared/FormItem";
import Button from "@/components/shared/atoms/Button";
import Typography from "@/components/shared/atoms/Typography";
import Input from "@/components/shared/atoms/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const passwordFormSchema = z.object({
	password: z
		.string()
		.min(8, { message: "Password must be at least 8 characters" }),
});

export type PasswordFormValues = z.infer<typeof passwordFormSchema>;

const ConfirmPassword = () => {
	const [apiStatus, setApiStatus] = useState<ApiStatus>("idle");
	const [isDeleted, setIsDeleted] = useState(false);

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
	} = useForm<PasswordFormValues>({
		mode: "onSubmit",
		resolver: zodResolver(passwordFormSchema),
		defaultValues: {
			password: "",
		},
	});

	const btnDisabled = Object.keys(errors).length > 0 || !isValid;

	const handleFormSubmit: SubmitHandler<PasswordFormValues> = async ({
		password,
	}) => {
		try {
			setApiStatus("loading");
			console.log({ password });
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
			setIsDeleted(true);
		} catch (error) {
			setApiStatus("failed");
			setError("password", { message: "Invalid password" });
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
				{isDeleted ? (
					<Typography type="h2">Your Benchlink account is deleted</Typography>
				) : (
					<>
						<Typography type="h2">
							Please enter your account password for xxx@gmail.com
						</Typography>
						<form
							onSubmit={handleSubmit(handleFormSubmit)}
							className="w-full space-y-5"
						>
							<FormItem
								label="Password"
								error={errors.password?.message}
								required
								initialFocus
							>
								<Input {...register("password")} />
							</FormItem>
							<div className="w-full bg-white outline-none text-center">
								<Button
									value="Delete Account"
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

export default ConfirmPassword;
