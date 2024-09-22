/* eslint-disable no-undef */
import React from 'react';
import MenuDropDown from './MenuDropDown';
import MenuDropDownItem from './MenuDropDownItem';
import MenuSingle from './MenuSingle';
export interface Props { }

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
               
                {/* Account  */}
                <MenuDropDown group_title="Account" icon="icon-desktop">
                    <MenuDropDownItem label="Incomes" to="/accounts/incomes" />
                    <MenuDropDownItem label="Expenses" to="/accounts/expense" />
                    <MenuDropDownItem label="Expense Entry" to="/accounts/new-expense" />
                    <MenuDropDownItem label="All Account" to="/account_types" />
                    <MenuDropDownItem label="All Account Number" to="/account_numbers" />
                    <MenuDropDownItem label="All Account Categories" to="/account_categories" />
                    <MenuDropDownItem label="Debit Credit" to="/debit_credit" />
                </MenuDropDown>

                <li>
                    <a className="sidebar-header" href="/logout" onClick={(e) => {
                        e.preventDefault();
                        return (window as any).confirm('logout!!') &&
                            (document.getElementById('logout_form') as HTMLFormElement)?.submit();
                    }}>
                        <i className="icon-lock"></i>
                        <span> Logout</span>
                    </a>
                </li>

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
    (window as any)
        .$(`.sidebar-submenu a[href="${url.hash}"]`)
        .parent('li')
        .parent('ul').css({ display: 'block' }).addClass('menu-open')
        .parent('li').addClass('active')

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
