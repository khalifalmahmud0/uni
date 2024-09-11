import React, { useEffect, useState } from 'react';
import { commnStoreInitialState } from '../../../store/slices/common_slice';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import axios from 'axios';
import { anyObject } from '../../../common_types/object';
import { Tree, TreeNode } from 'react-organizational-chart';

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
    }, []);

    function tree_item(item) {
        return <div>
            <div className="mb-2">
                <img src={`/${item.image || 'avatar.png'}`} style={{ width: '40px', height: '40px', borderRadius: '50%', border: '1px solid white', padding: '3px' }} />
            </div>
            {item.uid} - {item.name}
        </div>;
    }

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
                    <div className="card-body" style={{ overflow: 'auto' }}>
                        <div style={{ minWidth: '400px' }}>
                            <Tree label={tree_item(tree)}>
                                {
                                    (tree as anyObject)?.agms?.map(agm => {
                                        return (
                                            <TreeNode label={tree_item(agm)}>
                                                {
                                                    agm.mos?.map(mo => {
                                                        return (
                                                            <TreeNode label={tree_item(mo)} />
                                                        )
                                                    })
                                                }
                                            </TreeNode>
                                        )
                                    })
                                }
                            </Tree>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    </div>;
};

export default BusinessModel;
