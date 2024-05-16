import {useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import FormItem from "@/components/shared/FormItem";
import Button from "@/components/shared/atoms/Button";
import Input from "@/components/shared/atoms/Input";
import Typography from "@/components/shared/atoms/Typography";
import {ApiStatus} from "@/api/types/@shared";
import AuthService from "@/api/services/Auth";
import {AxiosError} from "axios";
import MemberService from "@/api/services/Member";

const emailFormSchema = z.object({
    email: z
        .string()
        .min(1, {message: "Please enter the email"})
        .email({message: "Invalid email format"}),
});

export type EmailFormValues = z.infer<typeof emailFormSchema>;

const DeleteAccount = () => {
    const [apiStatus, setApiStatus] = useState<ApiStatus>("idle");
    const [requestDelete, setRequestDelete] = useState(false);

    const {
        handleSubmit,
        register,
        formState: {errors, isValid},
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
            const verifyEmailResponse = await AuthService.postVerifyEmail({email});

            if (!verifyEmailResponse.requestId) {
                throw new Error("Can't find email");
            }


            const {isDeleted} = await MemberService.deleteMember({email, verificationId: verifyEmailResponse.requestId});

            if (!isDeleted) {
                throw new Error("Failed to delete")
            }

            setApiStatus("succeeded");
            setRequestDelete(true);
        } catch (error) {
            // TODO: check if this error code is valid
            if (error instanceof AxiosError && error.response?.status === 409) {
                setError("email", {message: "This account does not exist"});
            }
            setApiStatus("failed");
            console.log({error});
        }
    };

    return (
        <>
            <div
                className="flexCol items-center  px-5 mt-5 gap-6"
                style={{height: `calc(100dvh - 58px)`}}
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
                                <Input {...register("email")} type="password"/>
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
        </>
    );
};

export default DeleteAccount;
