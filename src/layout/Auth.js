import React, { useEffect } from "react";
import Logo from "../assets/logo.svg";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Auth = () => {
	const navigate = useNavigate();

	const { user_details } = useSelector((state) => state.auth);

	useEffect(() => {
		if (user_details && user_details._id) {
			navigate("/dashboard");
		}
	}, [user_details]);

	return (
		<div className="auth-page">
			<div className="cover-1">
				<img src={Logo} alt="Logo" height={60} />
			</div>
			<div className="cover-2">
				<div className="auth-form shadow">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default Auth;
