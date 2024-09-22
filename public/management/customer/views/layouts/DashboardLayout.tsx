import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import TopHeader from './shared/TopHeader';
import SideBar from './shared/menu/SideBar';
import commonStore, { commnStoreInitialState } from '../../store/slices/common_slice';
import { RootState, useAppDispatch } from '../../store/index';
import axios from 'axios';
import { useSelector } from 'react-redux';

export interface Props { }

const DashboardLayout: React.FC<Props> = (props: Props) => {
    const state: typeof commnStoreInitialState = useSelector(
        (state: RootState) => state['common_store'],
    );
    const dispatch = useAppDispatch();
    useEffect(() => {
        axios.get('/api/v1/users/auth-customer')
            .then(res => {
                dispatch(commonStore.actions.set_auth_user(res.data.data) as any);
            })

    }, [])

    return (
        <div className="page-wrapper">
            {/*Page Header Start*/}
            <TopHeader></TopHeader>
            {/*Page Header Ends*/}

            {/*Page Body Start*/}
            <div className="page-body-wrapper">
                {/*Page Sidebar Start*/}
                <div className="page-sidebar custom-scrollbar">
                    <div className="sidebar-user text-center">
                        <div>
                            {
                                (state.auth_user as any).user?.image ?
                                    <img
                                        className="img-50 rounded-circle"
                                        src={(state.auth_user as any).user.image}
                                        alt="#"
                                    />
                                    :
                                    <img
                                        className="img-50 rounded-circle"
                                        src="/assets/dashboard_uni/1.jpg"
                                        alt="#"
                                    />
                            }
                        </div>
                        <h6 className="mt-3 f-12">
                            {(state.auth_user as any).user?.name} <br />
                            {(state.auth_user as any).user?.uid}
                        </h6>
                    </div>
                    <SideBar />
                </div>
                {/*Page Sidebar Ends*/}
                <div className="page-body">
                    <div className="row">
                        <div className="col-sm-12">
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
            {/*Page Body Ends*/}
        </div>
    );
};
export default DashboardLayout;
