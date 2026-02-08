import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import userSlice from "./users/userSlice";
import basicSlice from "./basic/basicSlice";
import featureSlice from "./features/featureSlice";
import propertySlice from "./properties/propertySlice";
import investmentSlice from "./investment/investmentSlice";

const rootReducer = combineReducers({
	auth: authSlice,
	users: userSlice,
	basic: basicSlice,
	features: featureSlice,
	properties: propertySlice,
	investments: investmentSlice,
});

export default rootReducer;
