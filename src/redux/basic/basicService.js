import axios from "axios";
import { url } from "../config";
import { authHeader, headers } from "../headers";

const getStats = async (token) => {
	const response = await axios.get(`${url}/settings/statistics`, {
		headers: authHeader(token),
	});
	if (response.data) {
		return response.data;
	}
};

const loadSettings = async () => {
	const response = await axios.get(`${url}/settings/website-content`, {
		headers,
	});
	if (response.data) {
		return response.data;
	}
};

const updateSettings = async (token, obj) => {
	const response = await axios.post(`${url}/settings/website-content`, obj, {
		headers: authHeader(token),
	});
	if (response.data) {
		return response.data;
	}
};

const basicService = {
	getStats,
	loadSettings,
	updateSettings,
};

export default basicService;
