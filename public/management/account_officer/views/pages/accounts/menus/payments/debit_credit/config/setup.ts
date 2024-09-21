import setup_type from './setup_type';

const prefix: string = 'debit_credit';
const setup: setup_type = {
    prefix,
    module_name: 'debit_credit',

    route_prefix: 'debit_credit',

    api_host: location.origin,
    api_prefix: 'users',

    store_prefix: 'debit_credit',
    layout_title: prefix + ' Management',

    all_page_title: 'All ' + prefix,
    details_page_title: 'Details ' + prefix,
    create_page_title: 'Create ' + prefix,
    edit_page_title: 'Edit ' + prefix,
};

export default setup;
