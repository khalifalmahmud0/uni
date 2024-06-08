import React from 'react';
import { Link } from 'react-router-dom';
export interface Props {}

const T1: React.FC<Props> = (props: Props) => {
    return <div> 
        admin Dashboard

        <ul className='dashboard_links'>
            <li>
                <Link to="/branch-staffs"> 
                    <span className="material-symbols-outlined fill">clinical_notes</span>
                    Brach Staff Management
                </Link>
            </li>
            <li>
                <Link to="/user-admins"> 
                    <span className="material-symbols-outlined fill">groups</span>
                    Admin Management
                </Link>
            </li>
        </ul>
    </div>;
};

export default T1;
