import { PropsWithChildren } from "react";
import LogoIcon from "@/assets/icons/benchlink-logo.svg?react";

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<div
			className="w-full h-full flexCol bg-white"
			style={{ height: "100dvh" }}
		>
			<header className="bg-[#000000]">
				<div className="h-[58px] max-w-[694px] px-4  flex items-center justify-between mx-auto">
					<LogoIcon width={123} />
				</div>
			</header>
			{children}
		</div>
	);
};

export default Layout;
