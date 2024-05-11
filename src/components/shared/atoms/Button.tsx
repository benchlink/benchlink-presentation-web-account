import { ComponentProps, ReactNode } from "react";
import Typography, { TypographyType } from "./Typography";
import Loading from "../Loading";
import { cn } from "@/utils/cn";

export type ButtonColor =
	| "primary"
	| "secondary"
	| "secondaryGray"
	| "tertiaryGray"
	| "pointColor";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";

export interface ButtonProps
	extends Omit<ComponentProps<"button">, "color" | "children" | "value"> {
	color?: ButtonColor;
	size?: ButtonSize;
	typography?: TypographyType;
	value: string;
	tag?: string | boolean;
	loading?: boolean;
	PrifixIcon?: ReactNode;
}

const Button = ({
	value,
	tag,
	PrifixIcon,
	size = "lg",
	color = "primary",
	disabled = false,
	className,
	onClick,
	loading = false,
	...rest
}: ButtonProps) => {
	const typography = typographyTypeObj[size];

	return (
		<button
			className={cn(
				"flexRowCenter w-full gap-1 items-center focus:outline-none",
				sizeObj[size],
				color === "secondaryGray" && "bg-gray-surface2",
				className,
				{
					"bg-black text-white": !disabled || color === "primary",
					"bg-[#F0F2F5] opacity-60 text-black border-none": disabled,
					"bg-white text-black  border border-black": color === "secondary",
					"bg-white text-black border border-gray-stroke":
						color === "secondaryGray",
					"bg-gray-surface2 text-black": color === "tertiaryGray",
					"bg-pointColor-200 text-black": color === "pointColor",
				}
			)}
			disabled={disabled}
			onClick={(e) => {
				if (disabled || loading) return;
				onClick?.(e);
			}}
			{...rest}
		>
			{loading ? (
				<Loading />
			) : (
				<Typography type={typography} className="flexRowCenter gap-[2px]">
					{PrifixIcon && PrifixIcon}
					{value}
				</Typography>
			)}
			{tag && (
				<div className="w-5 h-5 flexRowCenter bg-pointColor-200 rounded-full text-black">
					{tag}
				</div>
			)}
		</button>
	);
};

export const typographyTypeObj: Record<ButtonSize, TypographyType> = {
	xs: "button2",
	sm: "button2",
	md: "button1",
	lg: "h4",
	xl: "h3",
};

export const sizeObj: Record<ButtonSize, string> = {
	xs: "px-[16px] h-[32px] rounded-md",
	sm: "px-[16px] h-[40px] rounded-lg",
	md: "px-[16px] h-[48px] rounded-[10px]",
	lg: "px-[16px] h-[56px] rounded-xl",
	xl: "px-[16px] h-[64px] rounded-xl",
};

export default Button;
