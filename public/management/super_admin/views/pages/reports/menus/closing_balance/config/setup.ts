import setup_type from './setup_type';

const prefix: string = 'closing_balance';
const setup: setup_type = {
    prefix,
    module_name: 'closing_balance',

    route_prefix: 'closing_balance',

    api_host: location.origin,
    api_prefix: 'users',

    store_prefix: 'closing_balance',
    layout_title: prefix + ' Management',

    all_page_title: 'All ' + prefix,
    details_page_title: 'Details ' + prefix,
    create_page_title: 'Create ' + prefix,
    edit_page_title: 'Edit ' + prefix,
};

export default setup;
