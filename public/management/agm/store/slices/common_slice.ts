import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { anyObject } from '../../common_types/object';

export const commnStoreInitialState = {
    cached: 0,
    auth_user: {},
};

const commonStore = createSlice({
    name: 'common_store',
    initialState: commnStoreInitialState,
    reducers: {
        set_cached: (state, action: PayloadAction<number>) => {
            state.cached = action.payload;
        },
        set_auth_user: (state, action: PayloadAction<anyObject>) => {
            state.auth_user = action.payload;
        }
    },
});

export default commonStore;
