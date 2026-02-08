import toast from "react-hot-toast";

const displayError = (error, present) => {
	const message =
		(error.response &&
			error.response.data &&
			error.response.data.message) ||
		error.message ||
		error.toString();
	if (present) {
		toast.error(message, { position: "top-right" });
	}
	return message;
};

export { displayError };
