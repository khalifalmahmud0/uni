import setup_type from './setup_type';

const prefix: string = 'project_income';
const setup: setup_type = {
    prefix,
    module_name: 'project_income',

    route_prefix: 'project_income',

    api_host: location.origin,
    api_prefix: 'users',

    store_prefix: 'project_income',
    layout_title: prefix + ' Management',

    all_page_title: 'All ' + prefix,
    details_page_title: 'Details ' + prefix,
    create_page_title: 'Create ' + prefix,
    edit_page_title: 'Edit ' + prefix,
};

export default setup;
