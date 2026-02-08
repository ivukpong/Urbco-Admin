import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PropertyForm from "../../../component/PropertyForm";
import propertyService from "../../../redux/properties/propertyService";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../../component/Loader";
import { displayError } from "../../../redux/error";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

const EditProperty = () => {
	const params = useParams();

	const navigate = useNavigate();

	const [load, setLoad] = useState(false);
	const { user_details } = useSelector((state) => state.auth);
	const [propertyDetails, setPropertyDetails] = useState({});

	useEffect(() => {
		if (params.id) {
			getDetails();
		}
	}, [params]);

	const getDetails = async () => {
		try {
			setLoad(true);
			let res = await propertyService.getPropertyDetails(
				user_details.access_token,
				params.id
			);
			setLoad(false);
			if (res && res.data) {
				setPropertyDetails(res.data);
			}
		} catch (err) {
			navigate(-1);
			displayError(err, true);
		}
	};

	return (
		<div className="property-create">
			<button className="back" onClick={() => navigate(-1)}>
				<BsFillArrowLeftSquareFill />
				<span>Back</span>
			</button>
			{user_details.role_id &&
				user_details.role_id.permissions.includes(
					"edit-properties"
				) && (
					<div className="card">
						<div className="card-header">
							<h6>Property Details</h6>
						</div>
						{load ? (
							<div className="card-body pb-5 pt-5">
								<Loader />
							</div>
						) : (
							propertyDetails &&
							propertyDetails._id && (
								<PropertyForm
									propertyDetails={propertyDetails}
								/>
							)
						)}
					</div>
				)}
		</div>
	);
};

export default EditProperty;
