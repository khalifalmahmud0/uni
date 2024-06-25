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
                {/* Dashboard  */}
                <MenuSingle to="/" icon="icon-dashboard" label="Dashboard" />
                {/* HRM  */}
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
                {/* Booking  */}
                <MenuDropDown group_title="Projects" icon="icon-desktop">
                    <MenuDropDownItem label="All Projects" to="/project" />
                    <MenuDropDownItem label="Create Project" to="/project/create" />
                    <MenuDropDownItem label="All Bookings" to="/booking" />
                    <MenuDropDownItem label="Create Booking" to="/booking/create" />
                     <MenuDropDownItem label="Project Payment" to="/booking/payments" />
                </MenuDropDown>
                {/* Account  */}
                <MenuDropDown group_title="Account" icon="icon-desktop">
                    <MenuDropDownItem label="Internal Income" to="#" />
                    <MenuDropDownItem label="Project Income" to="/accounts/payment" />
                    <MenuDropDownItem label="Expense" to="#" />
                    <MenuDropDownItem label="All Account" to="/accounts/type" />
                    <MenuDropDownItem label="All Account Number" to="/accounts/number" />
                    <MenuDropDownItem label="All Account Categories" to="/accounts/category" />
                    <MenuDropDownItem label="Debit Credit" to="/" />
                </MenuDropDown>
                {/* Reports  */}
                <MenuDropDown group_title="Reports" icon="icon-desktop">
                    <MenuDropDownItem label="Income Statement" to="#" />
                    <MenuDropDownItem label="Expense Statement" to="#" />
                    <MenuDropDownItem label="Closing Balance" to="#" />
                    <MenuDropDownItem label="Project Report" to="#" />
                    <MenuDropDownItem label="Customer Report" to="#" />
                    <MenuDropDownItem label="Due Report" to="#" />
                    <MenuDropDownItem label="Incentive Report" to="#" />
                </MenuDropDown>
                {/* Project Visits  */}
                <MenuDropDown group_title="Project Visits" icon="icon-desktop">
                    <MenuDropDownItem label="Visit History" to="#" />
                    <MenuDropDownItem label="Assign Visit" to="#" />
                </MenuDropDown>
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
