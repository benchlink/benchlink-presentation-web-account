import ConfirmPassword from "@/pages/DeleteAccount/ConfirmPassword";
import DeleteAccount from "@/pages/DeleteAccount";

const BenchlinkRouter = () => {
	const urlParams = new URLSearchParams(window.location.search);
    const uuid = urlParams.get('uuid') ?? '';

    return (
        <div
            className="w-full h-full flexCol bg-white"
            style={{height: "100dvh"}}
        >
            {uuid ? <ConfirmPassword uuid={uuid}/> : <DeleteAccount/>}
        </div>
    );
};

export default BenchlinkRouter;
