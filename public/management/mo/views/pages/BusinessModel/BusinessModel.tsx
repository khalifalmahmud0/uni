import React, { useEffect, useState } from 'react';
import { commnStoreInitialState } from '../../../store/slices/common_slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import tree from '../../../../../../src/modules/auth_management/user_management/services/tree';
import axios from 'axios';
import { anyObject } from '../../../common_types/object';
export interface Props { }

const BusinessModel: React.FC<Props> = (props: Props) => {
    const state: typeof commnStoreInitialState = useSelector(
        (state: RootState) => state['common_store'],
    );

    const [tree, setTree] = useState<Record<string, any>>({});
    useEffect(() => {
        axios.get('/api/v1/users/31/tree')
            .then(res => {
                console.log(res.data);
                setTree(res.data.data);
            });
    }, [])

    return <div className="page_content">
        <div className="row">
            <div className="col-12">
                <div className="card w-100 mt-4">
                    <div className="card-header">
                        <h5>
                            Business Model
                        </h5>
                        <div className="card-header-right">
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="tree_ul">
                            <ul>
                                <li>
                                {tree.uid} - {tree.name}
                                    <ul>
                                        {
                                            (tree as anyObject)?.gms?.map(gm => {
                                                return (
                                                    <li>
                                                        {gm.uid} - {gm.name}
                                                        <ul>
                                                            {
                                                                (gm as anyObject)?.agms?.map(agm => {
                                                                    return (
                                                                        <li>
                                                                            {agm.uid} - {agm.name}
                                                                            <ul>
                                                                                {
                                                                                    (agm as anyObject)?.mos?.map(mo => {
                                                                                        return (
                                                                                            <li>
                                                                                                {mo.uid} - {mo.name}
                                                                                            </li>
                                                                                        );
                                                                                    })
                                                                                }
                                                                            </ul>
                                                                        </li>
                                                                    );
                                                                })
                                                            }
                                                        </ul>
                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                </li>

                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </div>;
};

export default BusinessModel;
