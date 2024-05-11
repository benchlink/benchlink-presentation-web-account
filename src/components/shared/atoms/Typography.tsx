import { forwardRef, HTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";

export type TypographyType =
	| "h1"
	| "h2"
	| "h3"
	| "h4"
	| "body1"
	| "body2"
	| "button1"
	| "button2"
	| "caption1"
	| "caption2";
type TypographyOverflow =
	| "ellipsis"
	| "break-words"
	| "break-all"
	| "break-normal"
	| "break-keep";

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
	children?: ReactNode;
	type?: TypographyType;
	overflow?: TypographyOverflow;
	as?: keyof Pick<JSX.IntrinsicElements, "h1" | "h2" | "p" | "span">;
}

const Typography = forwardRef<HTMLParagraphElement, TypographyProps>(
	(
		{
			className,
			children,
			type = "body1",
			overflow,
			title = overflow === "ellipsis" && typeof children === "string"
				? children
				: undefined,
			as: El = defaultElDictionary[type],
			...rest
		},
		ref
	) => {
		return (
			<El
				ref={ref}
				title={title}
				className={cn([
					typoStyleDict[type],
					overflow && overflowDict[overflow],
					className,
				])}
				{...rest}
			>
				{children}
			</El>
		);
	}
);

const defaultElDictionary: Record<
	TypographyType,
	keyof Pick<JSX.IntrinsicElements, "h1" | "h2" | "h3" | "h4" | "p">
> = {
	h1: "h1",
	h2: "h2",
	h3: "h3",
	h4: "h4",
	body1: "p",
	body2: "p",
	button1: "p",
	button2: "p",
	caption1: "p",
	caption2: "p",
};

export const typoStyleDict: Record<TypographyType, string> = {
	h1: "font-bold leading-[40px] text-[32px]",
	h2: "font-bold leading-[31.2px] text-[24px]",
	h3: "font-bold leading-[26px] text-[20px]",
	h4: "font-bold leading-[21.6px] text-[18px]",
	body1: "font-normnal leading-[24px] text-[16px]",
	body2: "font-normnal leading-[19.6px] text-[14px]",
	button1: "font-bold leading-[24px] text-[16px]",
	button2: "font-bold leading-[21px] text-[14px]",
	caption1: "font-normnal leading-[18px] text-[12px]",
	caption2: "font-medium leading-[18px] text-[12px]",
};
const overflowDict: Record<TypographyOverflow, string> = {
	ellipsis: "truncate",
	"break-words": "break-words",
	"break-all": "break-all",
	"break-normal": "break-normal",
	"break-keep": "break-keep",
};

export default Typography;
