import axios from "axios";
import { url } from "../config";
import { authHeader } from "../headers";

const initiatePayment = async (token, obj) => {
	const { data } = await axios.post(`${url}/payments/initiate`, obj, {
		headers: authHeader(token),
	});
	return data.data;
};

const createInvestment = async (token, obj) => {
	const { data } = await axios.post(
		`${url}/payments/investments/create`,
		obj,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const verifyPayment = async (token, ref) => {
	const { data } = await axios.get(`${url}/payments/verify/${ref}`, {
		headers: authHeader(token),
	});
	return data.data;
};

const getInvestments = async (token, plan, page, investor) => {
	const { data } = await axios.get(
		`${url}/payments/investments?plan=${plan}&pageNumber=${
			page || "1"
		}&investor=${investor}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const getInvestmentReports = async (token, property, investor) => {
	const { data } = await axios.get(
		`${url}/payments/investments/reports?property=${
			property || ""
		}&investor=${investor || ""}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const getPayments = async (token, status, page) => {
	const { data } = await axios.get(
		`${url}/payments?status=${status}&pageNumber=${page || "1"}`,
		{
			headers: authHeader(token),
		}
	);
	return data.data;
};

const investmentService = {
	initiatePayment,
	createInvestment,
	verifyPayment,
	getInvestments,
	getPayments,
	getInvestmentReports,
};

export default investmentService;
