import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { displayError } from "../../../redux/error";
import userService from "../../../redux/users/userService";
import { toast } from "react-hot-toast";

const ChangeRole = ({ user, onComplete, onCancel }) => {
	const { user_details } = useSelector((state) => state.auth);
	const { roles } = useSelector((state) => state.users);

	const [role_id, setRole] = useState(user.role_id);
	const [load, setLoad] = useState(false);

	useEffect(() => {
		if (user.role_id) {
			setRole(user.role_id._id);
		}
	}, [user]);

	const changeHandler = async (e) => {
		e.preventDefault();
		let data = {
			role_id,
		};
		try {
			setLoad(true);
			let res = await userService.editUser(
				user_details.access_token,
				data,
				user._id
			);
			setLoad(false);
			if (res) {
				onComplete();
				onCancel();
				toast.success("Role has been updated", {
					position: "top-right",
				});
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<form className="form" onSubmit={changeHandler}>
			<h5 className="mb-3">Change Role for {user.first_name}</h5>
			<label>Role</label>
			<select
				value={role_id}
				disabled={load}
				onChange={(e) => setRole(e.target.value)}
			>
				<option value={""}>Select One</option>
				{roles &&
					Array.isArray(roles) &&
					roles.map((rol) => (
						<option key={rol._id} value={rol._id}>
							{rol.name}
						</option>
					))}
			</select>
			<div className="text-center">
				<button disabled={load} type="submit" className="main-btn">
					{load ? "Hold on..." : "Change"}
				</button>
			</div>
		</form>
	);
};

export default ChangeRole;
