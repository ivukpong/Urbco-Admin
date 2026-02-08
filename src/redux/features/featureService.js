import axios from "axios";
import { url } from "../config";
import { authHeader } from "../headers";

const getFeatures = async (token, status) => {
	const response = await axios.get(`${url}/features?status=${status}`, {
		headers: authHeader(token),
	});

	return response.data;
};

const createFeature = async (token, obj) => {
	const response = await axios.post(`${url}/features`, obj, {
		headers: authHeader(token),
	});

	return response.data;
};

const editFeature = async (token, obj, id) => {
	const response = await axios.patch(`${url}/features/${id}`, obj, {
		headers: authHeader(token),
	});

	return response.data;
};

const getTypes = async (token, status) => {
	const response = await axios.get(`${url}/types?status=${status}`, {
		headers: authHeader(token),
	});

	return response.data;
};

const createTypes = async (token, obj) => {
	const response = await axios.post(`${url}/types`, obj, {
		headers: authHeader(token),
	});

	return response.data;
};

const editTypes = async (token, obj, id) => {
	const response = await axios.patch(`${url}/types/${id}`, obj, {
		headers: authHeader(token),
	});

	return response.data;
};

const featureService = {
	getFeatures,
	createFeature,
	editFeature,
	getTypes,
	createTypes,
	editTypes,
};

export default featureService;
