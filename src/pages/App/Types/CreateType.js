import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import featureService from "../../../redux/features/featureService";
import { toast } from "react-hot-toast";
import { displayError } from "../../../redux/error";

const CreateType = ({ details, onComplete, onCancel }) => {
	const { user_details } = useSelector((state) => state.auth);

	const [name, setName] = useState("");
	const [status, setStatus] = useState("");
	const [statusScreen, setStatusScreen] = useState(false);
	const [load, setLoad] = useState(false);

	useEffect(() => {
		if (details.name) {
			setName(details.name);
			setStatus(details.status);
		}
	}, [details]);

	const actionHandler = async (e) => {
		e.preventDefault();
		let data = {
			name,
			status,
		};
		try {
			setLoad(true);
			let res;
			if (details._id) {
				res = await featureService.editTypes(
					user_details.access_token,
					data,
					details._id
				);
			} else {
				res = await featureService.createTypes(
					user_details.access_token,
					data
				);
			}

			setLoad(false);
			if (res) {
				onComplete();
				onCancel();
				toast.success(
					`Property types has been ${
						details._id ? "Edited" : "Added"
					}`,
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
			{details._id && statusScreen && (
				<>
					<label>Status</label>
					<select
						value={status}
						onChange={(e) => setStatus(e.target.value)}
					>
						<option value={""}>Select One</option>
						{details.status !== "active" && (
							<option value={"active"}>Activate</option>
						)}
						{details.status === "active" && (
							<>
								<option value={"inactive"}>Deactivate</option>
								<option value={"deleted"}>Delete</option>
							</>
						)}
					</select>
				</>
			)}
			{!statusScreen && (
				<>
					<label>Name</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						disabled={load}
					/>
				</>
			)}
			{details._id && (
				<div className="text-end mb-3">
					<a
						href="#"
						onClick={(e) => {
							e.preventDefault();
							setStatusScreen(!statusScreen);
						}}
						className="desc"
					>
						{statusScreen
							? "Go Back"
							: status === "active"
							? "Want to delete or deactivate?"
							: "Want to activate?"}
					</a>
				</div>
			)}
			<div className="text-center">
				<button disabled={load} type="submit" className="main-btn">
					{load ? "Hold on..." : details._id ? "Update" : "Create"}
				</button>
			</div>
		</form>
	);
};

export default CreateType;
