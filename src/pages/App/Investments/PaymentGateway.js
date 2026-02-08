import React, { useState } from "react";
import { usePaystackPayment } from "react-paystack";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../../utils/currencyFormatter";
import { environment } from "../../../redux/config";
import { displayError } from "../../../redux/error";
import { useNavigate } from "react-router-dom";
import investmentService from "../../../redux/investment/investmentService";

const PaymentGateway = ({ action, onCancel, initiate }) => {
	const [load, setLoad] = useState(false);
	const [error, setError] = useState(false);
	const [completed, setCompleted] = useState(false);

	const navigate = useNavigate();

	const { user_details } = useSelector((state) => state.auth);

	const getAmount = (no) => {
		if (no > 2500) {
			return percentPlusFlat(no);
		} else {
			return percentOnly(no);
		}
	};

	const percentOnly = (no) => {
		let app_fee = 0.015 + no;
		let final_amount;
		if (app_fee > 2000) {
			final_amount = no + 2500;
		} else {
			final_amount = no / (1 - 0.015) + 0.01;
		}

		return Number(Math.round(final_amount * 100));
	};

	const percentPlusFlat = (no) => {
		let app_fee = 0.015 * no + 100;
		let final_amount;
		if (app_fee > 2000) {
			final_amount = no + 2500;
		} else {
			final_amount = (no + 100) / (1 - 0.015) + 0.01;
		}

		return Number(Math.round(final_amount * 100));
	};

	const config = {
		publicKey:
			environment === "development"
				? "pk_test_b9d43f9158dbf4f6d599ea21698a961deb33774f"
				: "process.env.REACT_APP_PAYSTACK_LIVE",
		reference: initiate.tx_ref,
		amount: initiate.amount * 1,
		email: user_details.email,
		name: user_details.first_name,
		channels: ["card"],
	};

	const initializePayment = usePaystackPayment(config);

	const onSuccess = (reference) => {
		completeHandler(reference.reference);
	};

	const onClose = () => {
		console.log("Closed");
	};

	const completeHandler = async (ref) => {
		try {
			setLoad(true);
			let res = await investmentService.verifyPayment(
				user_details.access_token,
				ref
			);
			setLoad(false);
			if (res) {
				setError(false);
				setCompleted(true);
			}
		} catch (err) {
			setError(true);
			setLoad(false);
			displayError(err, true);
		}
	};

	return (
		<div className="payment mt-5">
			{initiate.tx_ref ? (
				<>
					{load ? (
						<p>Please wait while we verify your payment</p>
					) : error ? (
						<div>
							<p>
								There's an issue with your payment. Please
								contact Admin
							</p>
							<div className="gateway">
								<button
									onClick={() => {
										navigate(
											"/dashboard/payments/investments"
										);
									}}
									disabled={load ? true : false}
									className="main-btn"
								>
									View Investments
								</button>
							</div>
						</div>
					) : !completed ? (
						<>
							<div className="mb-3">
								<span>
									You are about to make a payment of {"₦ "}
									{formatCurrency(initiate.amount)}
								</span>
							</div>
							<div className="gateway">
								<button
									onClick={() => {
										initializePayment(onSuccess, onClose);
									}}
									disabled={load ? true : false}
									className="main-btn me-3"
								>
									Proceed
								</button>
								<button className="main-btn" onClick={onCancel}>
									Cancel
								</button>
							</div>
						</>
					) : (
						<>
							<div className="mb-3">
								<span>Your payment was successful</span>
							</div>
							<div className="gateway">
								<button
									onClick={() => {
										navigate(
											"/dashboard/payments/investments"
										);
									}}
									disabled={load ? true : false}
									className="main-btn"
								>
									View Investments
								</button>
							</div>
						</>
					)}
				</>
			) : (
				<p>
					We couldn't find a transaction reference. Please contact
					Admin or try another payment option.
				</p>
			)}
		</div>
	);
};

export default PaymentGateway;
