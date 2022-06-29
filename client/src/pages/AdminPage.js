import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminLeftSide from '../components/UI/Admin/AdminLeftSide';
import Header from '../components/UI/Header/Header';

const AdminPage = () => {
    return (
        <div>
            <Header />
            <div className="col-12 d-flex justify-content-between mt-2">
                <div className="col-3">
                    <AdminLeftSide />
                </div>
                <div className="col-9">
                    <Outlet />
                </div>

            </div>
        </div>
    );
};

export default AdminPage;