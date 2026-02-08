import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listInvestors } from "../../../redux/users/userSlice";
import { Link, useLocation } from "react-router-dom";
import Loader from "../../../component/Loader";
import { CSVLink } from "react-csv";

const Investors = () => {
	const dispatch = useDispatch();

	const pageNumber =
		new URLSearchParams(useLocation().search).get("page") || 1;

	const [userType, setUserType] = useState("");

	const { investors } = useSelector((state) => state.users);
	const { user_details } = useSelector((state) => state.auth);

	const headers = [
		{ label: "User Type", key: "user_type" },
		{ label: "Email", key: "email" },
		{ label: "Business Name", key: "business_name" },
		{ label: "Reg Number", key: "business_reg_no" },
		{ label: "Business Address", key: "business_address" },
		{ label: "Contact First Name", key: "first_name" },
		{ label: "Contact Last Name", key: "last_name" },
		{ label: "Gender", key: "gender" },
		{ label: "Contact Address", key: "address" },
		{ label: "Contact Phone", key: "phone" },
		{ label: "Business Phone", key: "business_phone" },
		{ label: "Date Of Incoporation", key: "date_of_incoporation" },
		{ label: "Country", key: "business_country" },
	];

	useEffect(() => {
		dispatch(
			listInvestors({
				token: user_details.access_token,
				page: pageNumber,
				userType,
			})
		);
	}, [userType, pageNumber]);

	return (
		<div className="table-div mt-5">
			<div className="filter align">
				<select
					value={userType}
					onChange={(e) => setUserType(e.target.value)}
				>
					<option value={""}>User Type</option>
					<option value={"individual"}>Individual</option>
					<option value={"business"}>Business</option>
					<option value={"couple"}>Couple</option>
					<option value={"cooperative"}>Co-operative</option>
				</select>
				{investors?.investors && (
					<CSVLink
						data={investors.investors}
						headers={headers}
						className="main-btn"
						filename="investors.csv"
					>
						Export CSV
					</CSVLink>
				)}
			</div>

			<div className="table-responsive">
				{investors && investors.investors ? (
					<>
						<table className="table table-bordered">
							<thead>
								<tr>
									<th>User Type</th>
									<th>Contact Details</th>
									<th>Contact Email</th>
									<th>Contact Phone</th>
									<th>Business Name</th>
									<th>Business Reg No</th>
									<th>More Info</th>
									<th>Investments</th>
								</tr>
							</thead>
							<tbody>
								{investors.investors.map((inv) => (
									<tr key={inv._id}>
										<td
											style={{
												textTransform: "capitalize",
											}}
										>
											{inv.user_type}
										</td>
										<td>
											{inv.first_name} {inv.last_name}
										</td>
										<td>{inv.email}</td>
										<td>{inv.phone}</td>
										<td>{inv.business_name || "--"}</td>
										<td>{inv.business_reg_no || "--"}</td>
										<td>
											<Link to={`${inv._id}`}>View</Link>
										</td>
										<td>
											<Link to={`${inv._id}/investments`}>
												View
											</Link>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</>
				) : (
					<Loader />
				)}
			</div>
		</div>
	);
};

export default Investors;
