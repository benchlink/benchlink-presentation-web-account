import {ApiStatus} from "@/api/types/@shared";
import FormItem from "@/components/shared/FormItem";
import Button from "@/components/shared/atoms/Button";
import Typography from "@/components/shared/atoms/Typography";
import Input from "@/components/shared/atoms/Input";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {z} from "zod";
import {AuthClient} from "@/api/services/Auth";
import {AxiosError} from "axios";
import MemberService from "@/api/services/Member.ts";

const passwordFormSchema = z.object({
    password: z
        .string()
        .min(8, {message: "Password must be at least 8 characters"}),
});

export type PasswordFormValues = z.infer<typeof passwordFormSchema>;

interface Props {
    uuid: string
}

const ConfirmPassword = ({uuid}: Props) => {
    const [apiStatus, setApiStatus] = useState<ApiStatus>("idle");
    const [isDeleted, setIsDeleted] = useState(false);
    const [email, setEmail] = useState<string>('');

    const {
        handleSubmit,
        register,
        formState: {errors, isValid},
        setError,
    } = useForm<PasswordFormValues>({
        mode: "onSubmit",
        resolver: zodResolver(passwordFormSchema),
        defaultValues: {
            password: "",
        },
    });


    useEffect(() => {
        if (uuid) {
            (async () => {
                const {email: emailFromUUID} = await AuthClient.getVerifyEmailStatus({uuid});
                setEmail(emailFromUUID)
            })();
        }
    }, [uuid]);

    const btnDisabled = Object.keys(errors).length > 0 || !isValid;

    const handleFormSubmit: SubmitHandler<PasswordFormValues>
        = async ({
                     password,
                 }) => {

        if (!uuid|| email === '') {
            setError("password", {message: "Can't find ID or expired"})
            setApiStatus("failed");
            return
        }

        setApiStatus("loading");
        try {
            const {requestId} = await AuthClient.patchVerifyEmailStatus({
                password,
                uuid,
            })

            if (!requestId) {
                setError("password", {message: "This code is already expired or password is wrong"})
                setApiStatus("failed");
                return
            }

            const {isDeleted: isDeletedResponse} = await MemberService.deleteMember({
                email,
                verificationId: requestId
            });

            if (!isDeletedResponse) {
                setError("password", {message: "Please check your password or if verification code is expired"})
                setApiStatus("failed");
            }


            setIsDeleted(true);
            setApiStatus("succeeded");
        } catch (error) {
            const statusCode = (error as AxiosError)?.response?.status
            switch (statusCode) {
                case(400):
                    setError("password", {message: "Invalid uuid"});
                    break;
                case(401):
                    setError("password", {message: "Invalid password"});
                    break;
                case(406):
                    setError("password", {message: "Invalid email"});
                    break;
                case(412):
                    setError("password", {message: "Token has been expired"});
                    break;
                case(417):
                    setError("password", {message: "Invalid token"});
                    break;
                default:
                    setError("password", {message: "Failed with unknown reason"})
            }
            setApiStatus("failed");
        }
    };

    return (
        <div
            className="flexCol items-center  px-5 mt-5 gap-6"
            style={{height: `calc(100dvh - 58px)`}}
        >
            {isDeleted ? (
                <Typography type="h2">Your Benchlink account is deleted</Typography>
            ) : (
                <>
                    <Typography type="h2">
                        Please enter your account password for {email}
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
                            <Input {...register("password")} type="password"/>
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
    );
};

export default ConfirmPassword;
