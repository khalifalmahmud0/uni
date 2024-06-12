/* eslint-disable no-undef */
import React from 'react';
import MenuDropDown from './MenuDropDown';
import MenuDropDownItem from './MenuDropDownItem';
import MenuSingle from './MenuSingle';
export interface Props {}

const SideBar: React.FC<Props> = (props: Props) => {
    setTimeout(() => {
        init_nav_action();
        active_link(window.location.href);
    }, 1000);

    return (
        <>
            <ul className="sidebar-menu">
                <MenuSingle to="/" icon="icon-dashboard" label="Dashboard" />

                <MenuDropDown
                    section_title="Management"
                    group_title="HRM"
                    icon="icon-desktop"
                >
                    <MenuDropDownItem label="All Employee" to="/users" />
                    <MenuDropDownItem
                        label="Create Employee"
                        to="/users/create"
                    />
                    <MenuDropDownItem
                        label="Employee History"
                        to="/users/history"
                    />
                </MenuDropDown>

                <MenuDropDown
                    section_title=""
                    group_title="Insentive"
                    icon="icon-money"
                >
                    <MenuDropDownItem label="Setup" to="/users" />
                    <MenuDropDownItem label="Overview" to="/users/create" />
                </MenuDropDown>

                <MenuDropDown
                    section_title=""
                    group_title="Accounts"
                    icon="icon-money"
                >
                    <MenuDropDownItem label="Accounts" to="/users" />
                    <MenuDropDownItem label="Categories" to="/users" />
                    <MenuDropDownItem label="Add Expense" to="/users" />
                    <MenuDropDownItem label="Create Money Reset" to="/users" />
                    <MenuDropDownItem
                        label="Profit and Loss"
                        to="/users/create"
                    />
                    <MenuDropDownItem
                        label="Balance Sheet"
                        to="/users/create"
                    />
                    <MenuDropDownItem
                        label="Employee Payments"
                        to="/users/create"
                    />
                </MenuDropDown>

                <MenuDropDown
                    section_title=""
                    group_title="Field Force"
                    icon="icon-money"
                >
                    <MenuDropDownItem label="Visit apartments" to="/users" />
                    <MenuDropDownItem
                        label="Daily report submission"
                        to="/users/create"
                    />
                </MenuDropDown>

                <MenuDropDown
                    section_title=""
                    group_title="Report"
                    icon="icon-money"
                >
                    <MenuDropDownItem label="Sales Report" to="/users" />
                </MenuDropDown>
                {/* Project  */}
                <MenuDropDown
                    section_title=""
                    group_title="Projects"
                    icon="icon-money"
                >
                    <MenuDropDownItem label="all" to="/users" />
                    <MenuDropDownItem label="create" to="/users" />
                </MenuDropDown>
                {/* Booking  */}
                <MenuDropDown
                    section_title=""
                    group_title="Booking"
                    icon="icon-money"
                >
                    <MenuDropDownItem label="Registration" to="/users" />
                    <MenuDropDownItem label="All" to="/users" />
                    <MenuDropDownItem label="Down Payements" to="/users" />
                    <MenuDropDownItem label="Booking Payements" to="/users" />
                    <MenuDropDownItem label="Others Payements" to="/users" />
                    <MenuDropDownItem
                        label="Installment Payements"
                        to="/users"
                    />
                </MenuDropDown>

                <MenuSingle
                    to="/contact-messages"
                    icon="icon-user"
                    label="Contact Message"
                />

                {/* <li>
                    <a
                        href="http://admin.pixelstrap.com/universal/default/maintenance.html"
                        className="sidebar-header"
                    >
                        <i className="icon-settings" />
                        <span>Maintenance</span>
                    </a>
                </li> */}
            </ul>
        </>
    );
};

function active_link(hash) {
    let url = new URL(hash);
    (window as any).$(`.sidebar-submenu a`).removeClass('active');
    (window as any)
        .$(`.sidebar-submenu a[href="${url.hash}"]`)
        .addClass('active');
}
function init_nav_action() {
    var animationSpeed = 300,
        subMenuSelector = '.sidebar-submenu';
    (window as any).$('.sidebar-menu').on('click', 'li a', function (e) {
        var $this = (window as any).$(this);
        var checkElement = $this.next();
        if (checkElement.is(subMenuSelector) && checkElement.is(':visible')) {
            checkElement.slideUp(animationSpeed, function () {
                checkElement.removeClass('menu-open');
            });
            checkElement.parent('li').removeClass('active');
        } else if (
            checkElement.is(subMenuSelector) &&
            !checkElement.is(':visible')
        ) {
            var parent = $this.parents('ul').first();
            var ul = parent.find('ul:visible').slideUp(animationSpeed);
            ul.removeClass('menu-open');
            var parent_li = $this.parent('li');
            checkElement.slideDown(animationSpeed, function () {
                checkElement.addClass('menu-open');
                parent.find('li.active').removeClass('active');
                parent_li.addClass('active');
            });
        }

        if (e.target && e.target.href && e.target.href.includes('http')) {
            active_link(e.target.href);
        }
    });
}

export default SideBar;
