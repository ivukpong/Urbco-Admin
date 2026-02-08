import { useLottie } from "lottie-react";
import Loading from "../assets/93789-circle-loading-animation-dark.json";

const style = {
	height: 100,
};

const Loader = () => {
	const options = {
		animationData: Loading,
		loop: true,
		autoplay: true,
	};

	const { View } = useLottie(options, style);

	return View;
};

export default Loader;
