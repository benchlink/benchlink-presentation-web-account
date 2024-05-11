import { cn } from "@/utils/cn";
import Typography from "../atoms/Typography";
import loadingAnimation from "./loading.json";
import Lottie from "react-lottie";

interface Props {
	className?: string;
	withText?: boolean;
}
const Loading = ({ className, withText = false }: Props) => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: loadingAnimation,
		rendererSettings: {
			preserveAspectRatio: "xMidYMid slice",
		},
	};

	if (withText) {
		return (
			<div className={cn("flexColCenter gap-[10px]", className)}>
				<Lottie options={defaultOptions} height={32} width={32} />
				<Typography type="body2" className="text-[#8D8D8D]">
					Loading
				</Typography>
			</div>
		);
	}

	return (
		<span className={cn(className)}>
			<Lottie options={defaultOptions} height={24} width={24} />
		</span>
	);
};

export default Loading;
