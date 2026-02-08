const formatCurrency = (value) => {
	let number = value || 0;
	return Number(number)
		.toFixed(2)
		.replace(/\d(?=(\d{3})+\.)/g, "$&,");
};

const numberWithCommas = (x) => {
	return x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0";
};

export { formatCurrency, numberWithCommas };
