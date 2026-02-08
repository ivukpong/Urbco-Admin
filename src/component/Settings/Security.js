import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/authSlice";
import userService from "../../redux/users/userService";
import { displayError } from "../../redux/error";

const Security = () => {
	const dispatch = useDispatch();

	const { user_details } = useSelector((state) => state.auth);

	const [load, setLoad] = useState(false);
	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const getInitials = (string) => {
		let names = string.split(" "),
			initials = names[0].substring(0, 1).toUpperCase();

		if (names.length > 1) {
			initials += names[names.length - 1].substring(0, 1).toUpperCase();
		}
		return initials;
	};

	const changeHandler = async () => {
		if (password && newPassword === confirmPassword) {
			let data = {
				old_password: password,
				new_password: newPassword,
				confirm_password: confirmPassword,
			};
			try {
				setLoad(true);
				let res = await userService.changePassword(
					user_details.access_token,
					data
				);
				if (res) {
					setLoad(false);

					toast.success(
						"Password has been changed. Please log in again.",
						{
							position: "top-right",
						}
					);
					dispatch(logout());
				}
			} catch (err) {
				setLoad(false);
				displayError(err, true);
			}
		} else {
			alert("Passwords does not match.");
		}
	};

	return (
		<div className="profile">
			<div className="d-flex justify-content-between">
				<div className={`initials`}>
					<span>
						{getInitials(
							`${user_details.first_name} ${user_details.last_name}`
						)}
					</span>
				</div>
			</div>
			<div className="content">
				<p>Change your password?</p>
			</div>
			<div className="form row mt-3">
				<div className="col-md-12">
					<label>Your Password</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="col-md-12">
					<label>New Password</label>
					<input
						type="password"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
					/>
				</div>
				<div className="col-md-12">
					<label>Confirm Password</label>
					<input
						type="password"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
					/>
				</div>
			</div>
			<div className="text-end">
				<button
					className="main-btn"
					onClick={changeHandler}
					disabled={load}
				>
					{load ? "Hold on..." : "Save"}
				</button>
			</div>
		</div>
	);
};

export default Security;
