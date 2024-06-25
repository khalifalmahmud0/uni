import setup_type from './setup_type';

const prefix: string = 'expense_statement';
const setup: setup_type = {
    prefix,
    module_name: 'expense_statement',

    route_prefix: 'expense_statement',

    api_host: location.origin,
    api_prefix: 'users',

    store_prefix: 'expense_statement',
    layout_title: prefix + ' Management',

    all_page_title: 'All ' + prefix,
    details_page_title: 'Details ' + prefix,
    create_page_title: 'Create ' + prefix,
    edit_page_title: 'Edit ' + prefix,
};

export default setup;
