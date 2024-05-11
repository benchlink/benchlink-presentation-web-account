import { PropsWithChildren, ReactNode, useEffect, useState } from "react";
import Typography from "@/components/shared/atoms/Typography";
import { cn } from "@/utils/cn";

export interface FormItemProps {
	label: ReactNode;
	required?: boolean;
	error?: string | boolean;
	initialFocus?: boolean;
	classNames?: {
		container?: string;
		label?: string;
		inputWrapper?: string;
	};
}

const FormItem = ({
	children,
	label,
	error,
	classNames,
	initialFocus = false,
}: PropsWithChildren<FormItemProps>) => {
	const [focus, setFocus] = useState(false);

	useEffect(() => {
		if (initialFocus) {
			setFocus(true);
		}
	}, []);

	return (
		<div>
			<label
				className={cn([
					"w-full flexCol gap-2 px-[1px] relative",
					classNames?.container,
				])}
			>
				{typeof label === "string" ? (
					<Typography
						type="button2"
						overflow="break-keep"
						className={cn("text-black", classNames?.label)}
					>
						{label}
					</Typography>
				) : (
					<div className={cn("text-black", classNames?.label)}>{label}</div>
				)}

				<div
					onChange={() => {
						if (error) {
							return;
						}
						setFocus(true);
					}}
					onFocus={() => {
						setFocus(true);
					}}
					onBlur={() => setFocus(false)}
					className={cn(
						"w-full leading-none rounded-[8px] outline outline-1  mx-auto",
						error
							? "outline-red"
							: focus
							? "outline-black"
							: "outline-gray-stroke",
						classNames?.inputWrapper
					)}
				>
					{children}
				</div>
			</label>
			{typeof error === "string" && <FormItemError>{error}</FormItemError>}
		</div>
	);
};

export const FormItemError = ({
	children,
	className,
}: {
	children: ReactNode;
	className?: string;
}) => {
	return (
		<Typography
			type="caption1"
			overflow="break-keep"
			className={cn("text-red text-left mt-1", className)}
		>
			{children}
		</Typography>
	);
};

export default FormItem;
