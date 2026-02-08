const environment = "production";

const config = {
	testUrl: "https://urbco-api.onrender.com/api",
	liveUrl: "https://api.urbco.ng/api",
};

const frontUrl = "https://urbco.netlify.app";
// const frontUrl = "http://localhost:3001";

const url = environment === "production" ? config.liveUrl : config.testUrl;

export { environment, config, url, frontUrl };
