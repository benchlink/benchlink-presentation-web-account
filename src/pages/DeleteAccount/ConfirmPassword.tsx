import {ApiStatus} from "@/api/types/@shared";
import PageNotFoundIcon from "@/assets/icons/page-not-found.svg?react";
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
    const [canVerifyPassword, setCanVerifyPassword] = useState(false);

    if (uuid === '') {
        location.href = '/'
    }

    useEffect(() => {
        if (uuid) {
            (async () => {
                const result = await AuthClient.getVerifyEmailStatus({uuid});
                if (!result.isVerified) {
                    setCanVerifyPassword(false);
                }
                setCanVerifyPassword(true);
            })();
        }
    }, []);

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

    const btnDisabled = Object.keys(errors).length > 0 || !isValid;

    const handleFormSubmit: SubmitHandler<PasswordFormValues> = async ({
                                                                           password,
                                                                       }) => {
        try {
            if (!uuid) {
                throw new Error("Id not found");
            }

            setApiStatus("loading");

            const result = await AuthClient.patchVerifyEmailStatus({
                password,
                uuid,
            });

            if (!result.requestId) {
                throw new Error("Delete account failed");
            }

            setApiStatus("succeeded");
            setIsDeleted(true);
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 401) {
                setError("password", {message: "Invalid password"});
            }
            console.log({error});
            setApiStatus("failed");
        }
    };

    if (!canVerifyPassword) {
        return (
            <div className="flexColCenter gap-[2px] h-[calc(100vh-58px)]">
                <PageNotFoundIcon/>
                <Typography type="h2">Oops!</Typography>
                <Typography type="caption1">Page not found</Typography>
            </div>
        );
    }

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
    );
};

export default ConfirmPassword;
