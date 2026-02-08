import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPayments } from "../../../redux/investment/investmentSlice";
import Loader from "../../../component/Loader";
import { formatCurrency } from "../../../utils/currencyFormatter";
import dateFormat from "dateformat";

const Transactions = () => {
	const navigate = useNavigate();

	const dispatch = useDispatch();

	const { user_details } = useSelector((state) => state.auth);
	const { loading, payments } = useSelector((state) => state.investments);

	const [status, setStatus] = useState("");
	const [page, setPage] = useState(1);

	useEffect(() => {
		window.scrollTo(0, 0);
		dispatch(
			getPayments({ token: user_details.access_token, status, page })
		);
	}, [status, page]);

	return (
		<div className="table-div mt-3">
			<div className="filter">
				<select
					value={status}
					onChange={(e) => setStatus(e.target.value)}
				>
					<option value={""}>Filter by Status</option>
					<option value={"pending"}>Pending</option>
					<option value={"success"}>Success</option>
					<option value={"failed"}>Failed</option>
				</select>
			</div>
			<div className="table-responsive">
				{loading ? (
					<Loader />
				) : (
					payments &&
					payments.payments && (
						<>
							<table className="table table-bordered">
								<thead>
									<tr>
										<th>Amount</th>
										<th>Transaction Ref</th>
										<th>Transaction Date</th>
										<th>Status</th>
									</tr>
								</thead>
								<tbody>
									{payments.payments.map((p) => (
										<tr key={p._id}>
											<td>₦{formatCurrency(p.amount)}</td>
											<td>{p.transaction_ref}</td>
											<td>
												{dateFormat(
													p.transaction_date ||
														p.createdAt,
													"mmmm dS, yyyy"
												)}
											</td>
											<td>{p.status}</td>
										</tr>
									))}
								</tbody>
							</table>
						</>
					)
				)}
			</div>
		</div>
	);
};

export default Transactions;
