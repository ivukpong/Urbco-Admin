import React from "react";
import store from "./redux/store";
import { Provider } from "react-redux";
import Routing from "./Routing";
import { Toaster } from "react-hot-toast";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

let persistor = persistStore(store);

const App = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Routing />
				<Toaster />
			</PersistGate>
		</Provider>
	);
};

export default App;
