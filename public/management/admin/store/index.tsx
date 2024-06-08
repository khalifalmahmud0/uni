import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import commonStore from './slices/common_slice';
import user_branch_staff_slice from '../views/pages/user_branch_staff/config/store';
import user_admins_slice from '../views/pages/user_admins/config/store';

const store = configureStore({
    reducer: {
        user_branch_staff: user_branch_staff_slice.reducer,
        common_store: commonStore.reducer,
        user_admins: user_admins_slice.reducer,
    },
    devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export default store;
