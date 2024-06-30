import { configureStore } from '@reduxjs/toolkit';
import loggedInStatusReducer from "./index"

export default configureStore({
 reducer: {
    loggedInStatus: loggedInStatusReducer,
 },
});
