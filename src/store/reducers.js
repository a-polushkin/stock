import { combineReducers } from "redux";

import { reducer as rootReducer, NAME as ROOT_NAME } from "../app/Root";
import { reducer as bookReducer, NAME as BOOK_NAME } from "../app/OrderBook";

export default combineReducers({
    [ROOT_NAME]: rootReducer,
    [BOOK_NAME]: bookReducer
});
