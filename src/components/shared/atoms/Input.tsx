import { ComponentProps, forwardRef } from "react";
import { cn } from "@/utils/cn";

const Input = forwardRef<HTMLInputElement, ComponentProps<"input">>(
	(
		{
			placeholder,
			value,
			type = "text",
			disabled,
			className,
			readOnly,
			...props
		},
		ref
	) => {
		return (
			<input
				ref={ref}
				type={type}
				className={cn(
					"w-full p-4 pr-0 border rounded-lg border-gray-stroke placeholder:text-gray-placeholder focus:outline-none",
					className,
					{
						"select-none bg-gray-surface1": disabled,
						"caret-transparent": readOnly,
					}
				)}
				value={value}
				placeholder={placeholder}
				disabled={disabled}
				readOnly={readOnly}
				{...props}
			/>
		);
	}
);

export default Input;
