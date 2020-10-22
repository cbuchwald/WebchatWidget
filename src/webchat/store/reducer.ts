import { combineReducers } from "redux";
import { options } from "./options/options-reducer";
import { messages } from "./messages/message-reducer";
import { ui } from "./ui/ui-reducer";
import { config } from "./config/config-reducer";
import { connection } from "./connection/connection-reducer";
import { StoreState } from "./store";

const rootReducer = combineReducers({
    messages,
    options,
    config,
    ui,
    connection
});

const RESET_STATE = 'RESET_STATE';
export const resetState = (state?: StoreState) => ({
    type: RESET_STATE as 'RESET_STATE',
    state
});

export const reducer = (state = rootReducer(undefined, { type: '' }), action) => {
    switch (action.type) {
        case 'RESET_STATE': {

            // We do not want to restore some properties from storage but keep the value from state
            const newState = action.state as StoreState;
            newState.connection.connected = state.connection.connected;

            return rootReducer(newState, { type: '' })
        };
    };

    return rootReducer(state, action);
};
