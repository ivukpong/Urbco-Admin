import React, { useEffect, useState } from "react";
import { displayError } from "../../../redux/error";
import userService from "../../../redux/users/userService";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../component/Loader";
import dateFormat from "dateformat";

const InvestorInfo = () => {
	const params = useParams();

	const navigate = useNavigate();

	const { user_details } = useSelector((state) => state.auth);

	const [details, setDetails] = useState({});
	const [load, setLoad] = useState(false);

	useEffect(() => {
		if (params.id) {
			getInfo();
		}
	}, [params]);

	const getInfo = async () => {
		try {
			setLoad(true);
			let res = await userService.investorDetails(
				user_details.access_token,
				params.id
			);

			setLoad(false);
			if (res && res.data) {
				setDetails(res.data);
			}
		} catch (err) {
			setLoad(false);
			displayError(err, true);
		}
	};

	const getInitials = (string) => {
		let names = string.split(" "),
			initials = names[0].substring(0, 1).toUpperCase();

		if (names.length > 1) {
			initials += names[names.length - 1].substring(0, 1).toUpperCase();
		}
		return initials;
	};

	return (
		<div className="table-div mt-3">
			<div className="card">
				<div className="card-header">
					<h6>Investor Details</h6>
				</div>
				<div className="card-body">
					{load ? (
						<Loader />
					) : (
						details &&
						details._id && (
							<div className="details">
								<div className="initials">
									{getInitials(
										details.user_type === "business"
											? `${details.business_name}`
											: `${details.first_name} ${details.last_name}`
									)}
								</div>
								<div className="row mb-4">
									{(details.user_type === "business" ||
										details.user_type ===
											"cooperative") && (
										<>
											<div className="b-details col-md-4 col-sm-6 mt-3 mb-2">
												<label>Business Name:</label>
												<p>{details.business_name}</p>
											</div>
											<div className="b-details col-md-4 col-sm-6 mt-3 mb-2">
												<label>
													Business Registration
													Number:
												</label>
												<p>{details.business_reg_no}</p>
											</div>
											<div className="b-details col-md-4 col-sm-6 mt-3 mb-2">
												<label>Business Email:</label>
												<p>{details.business_email}</p>
											</div>
											<div className="b-details col-md-4 col-sm-6 mt-3 mb-2">
												<label>Business Phone:</label>
												<p>{details.business_phone}</p>
											</div>
											<div className="b-details col-md-4 col-sm-6 mt-3 mb-2">
												<label>Business Address:</label>
												<p>
													{details.business_address}
												</p>
											</div>
											<div className="b-details col-md-4 col-sm-6 mt-3 mb-2">
												<label>Business Country:</label>
												<p>
													{details.business_country}
												</p>
											</div>
											<div className="b-details col-md-4 col-sm-6 mt-3 mb-2">
												<label>
													Date of Incoporation:
												</label>
												<p>
													{details.date_of_incoporation
														? dateFormat(
																details.date_of_incoporation,
																"dd mmmm, yyyy"
														  )
														: "Not Set"}
												</p>
											</div>
										</>
									)}
									<div className="b-details col-md-4 col-sm-6 mt-3 mb-2">
										<label>
											{details.user_type === "business" ||
											details.user_type === "cooperative"
												? "Contact Person"
												: "Full Name"}
											:
										</label>
										<p>
											{details.first_name}{" "}
											{details.last_name}
										</p>
									</div>
									<div className="b-details col-md-4 col-sm-6 mt-3 mb-2">
										<label>
											{details.user_type === "business"
												? "Contact Email"
												: "Email"}
											:
										</label>
										<p>{details.email}</p>
									</div>
									<div className="b-details col-md-4 col-sm-6 mt-3 mb-2">
										<label>
											{details.user_type === "business"
												? "Contact Phone"
												: "Phone Number"}
											:
										</label>
										<p>{details.phone}</p>
									</div>
									<div className="b-details col-md-4 col-sm-6 mt-3 mb-2">
										<label>
											{details.user_type === "business"
												? "Contact Address"
												: "Address"}
											:
										</label>
										<p>{details.address}</p>
									</div>
									{details.user_type === "individual" && (
										<>
											<div className="b-details col-md-4 col-sm-6 mt-3 mb-2">
												<label>Date Of Birth</label>
												<p>
													{details.date_of_birth
														? dateFormat(
																details.date_of_birth,
																"dd mmmm, yyyy"
														  )
														: "Not set"}
												</p>
											</div>
											<div className="b-details col-md-4 col-sm-6 mt-3 mb-2">
												<label>Marital Status</label>
												<p>{details.marital_status}</p>
											</div>
											<div className="b-details col-md-4 col-sm-6 mt-3 mb-2">
												<label>Gender</label>
												<p>{details.gender}</p>
											</div>
										</>
									)}
								</div>
								<div>
									<button
										onClick={() => navigate(`investments`)}
										className="main-btn"
									>
										View Investments
									</button>
								</div>
							</div>
						)
					)}
				</div>
			</div>
		</div>
	);
};

export default InvestorInfo;
