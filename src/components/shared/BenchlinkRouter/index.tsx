import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import DeleteAccount from "@/pages/DeleteAccount";
import ConfirmPassword from "@/pages/DeleteAccount/ConfirmPassword";

const BenchlinkRouter = () => {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<Routes>
				<Route path="/delete-account">
					<Route element={<DeleteAccount />} index />
					<Route path="confirm-password" element={<ConfirmPassword />} />
				</Route>

				<Route path="/" element={<Navigate to="/delete-account" replace />} />
				<Route path="*" element={<Navigate to="/delete-account" replace />} />
			</Routes>
		</BrowserRouter>
	);
};

export default BenchlinkRouter;
