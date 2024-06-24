import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import commonStore from './slices/common_slice';
import users from '../views/pages/users/config/store';
import booking from '../views/pages/booking/config/store';
import project from '../views/pages/project/config/store';
import accounts from '../views/pages/accounts/config/store';

const store = configureStore({
    reducer: {
        users: users.reducer,
        booking: booking.reducer,
        project: project.reducer,
        accounts: accounts.reducer,
        common_store: commonStore.reducer,
    },
    devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export default store;
