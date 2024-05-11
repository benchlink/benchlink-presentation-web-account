import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ScrollToTop from "../ScrollToTop";
import DeleteAccount from "@/pages/DeleteAccount";
import ConfirmPassword from "@/pages/DeleteAccount/ConfirmPassword";
import Layout from "../Layout";

const BenchlinkRouter = () => {
	return (
		<BrowserRouter>
			<ScrollToTop />
			<Routes>
				<Route path="/delete-account" element={<Layout />}>
					<Route element={<DeleteAccount />} index />
					<Route path=":uuid" element={<ConfirmPassword />} />
				</Route>

				<Route path="/" element={<Navigate to="/delete-account" replace />} />
				<Route path="*" element={<Navigate to="/delete-account" replace />} />
			</Routes>
		</BrowserRouter>
	);
};

export default BenchlinkRouter;
