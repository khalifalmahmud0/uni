import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

import commonStore from './slices/common_slice';
import users from '../views/pages/users/config/store';
import contact_messages from '../views/pages/contact_messages/config/store';
import projects from '../views/pages/projects/config/store';

const store = configureStore({
    reducer: {
        users: users.reducer,
        contact_messages: contact_messages.reducer,
        projects: projects.reducer,
        common_store: commonStore.reducer,
    },
    devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export type RootState = ReturnType<typeof store.getState>;
export default store;
