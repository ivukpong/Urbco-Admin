import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import userService from "../../../redux/users/userService";
import { toast } from "react-hot-toast";
import { displayError } from "../../../redux/error";

const CreateRole = ({ details, onCancel, onComplete }) => {
	const { user_details } = useSelector((state) => state.auth);
	const { permissions } = useSelector((state) => state.users);

	const [name, setName] = useState("");
	const [permissionsList, setPermissionsList] = useState([]);
	const [load, setLoad] = useState(false);

	useEffect(() => {
		if (details.name) {
			setName(details.name);
			setPermissionsList(details.permissions);
		}
	}, [details]);

	const checkHandler = (e, code) => {
		if (e.target.checked) {
			setPermissionsList((list) => [...list, code]);
		} else {
			setPermissionsList(permissionsList.filter((p) => p !== code));
		}
	};

	const actionHandler = async (e) => {
		e.preventDefault();
		let data = {
			name,
			permissions: permissionsList,
		};
		try {
			setLoad(true);
			let res;
			if (details._id) {
				res = await userService.editRole(
					user_details.access_token,
					data,
					details._id
				);
			} else {
				res = await userService.createRole(
					user_details.access_token,
					data
				);
			}

			setLoad(false);
			if (res) {
				onComplete();
				onCancel();
				toast.success(
					`Role has been ${details._id ? "Edited" : "Added"}`,
					{
						position: "top-right",
					}
				);
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<form className="form" onSubmit={actionHandler}>
			<label>Name</label>
			<input
				type="text"
				value={name}
				onChange={(e) => setName(e.target.value)}
				required
				disabled={load}
			/>
			<label>Permissions</label>
			<div className="checks">
				{permissions &&
					Array.isArray(permissions) &&
					permissions.map((p) => (
						<div className="check" key={p._id}>
							<input
								type="checkbox"
								checked={
									permissionsList.find((l) => l == p.code)
										? true
										: false
								}
								onChange={(e) => checkHandler(e, p.code)}
							/>
							<span>{p.name}</span>
						</div>
					))}
			</div>
			<div className="text-center">
				<button disabled={load} type="submit" className="main-btn">
					{load ? "Hold on..." : details._id ? "Edit" : "Create"}
				</button>
			</div>
		</form>
	);
};

export default CreateRole;
