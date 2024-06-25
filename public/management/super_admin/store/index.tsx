import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import commonStore from './slices/common_slice';
import users from '../views/pages/users/config/store';
import booking from '../views/pages/booking/config/store';
import project from '../views/pages/project/config/store';
import accounts from '../views/pages/accounts/config/store';
import account_types from '../views/pages/accounts/menus/accounts/account_types/config/store';
import account_categories from '../views/pages/accounts/menus/accounts/account_categories/config/store';
import account_numbers from '../views/pages/accounts/menus/accounts/account_numbers/config/store';
import project_income from '../views/pages/accounts/menus/payments/project_income/config/store';
const store = configureStore({
    reducer: {
        users: users.reducer,
        booking: booking.reducer,
        project: project.reducer,
        accounts: accounts.reducer,
        account_types: account_types.reducer,
        account_categories: account_categories.reducer,
        account_numbers: account_numbers.reducer,
        project_income: project_income.reducer,
        common_store: commonStore.reducer,
    },
    devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export default store;
