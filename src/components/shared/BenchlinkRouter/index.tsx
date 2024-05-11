import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import DeleteAccount from "@/pages/DeleteAccount";

const BenchlinkRouter = () => {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<Routes>
				<Route path="/delete-account" element={<DeleteAccount />} />

				<Route path="/" element={<Navigate to="/delete-account" replace />} />
				<Route path="*" element={<Navigate to="/delete-account" replace />} />
			</Routes>
		</BrowserRouter>
	);
};

export default BenchlinkRouter;
