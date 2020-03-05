import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './Navigation.scss';

import TehranLogo from '../svg/tehran_logo';
import HeaderBackground from '../svg/header_background';

export class Navigation extends Component {
	static displayName = Navigation.name;

	constructor(props) {
		super(props);

		this.toggleNavbar = this.toggleNavbar.bind(this);
		this.state = {
			collapsed: true
		};
	}

	toggleNavbar() {
		this.setState({
			collapsed: !this.state.collapsed
		});
	}

	render() {
		return (
			<header>
				<HeaderBackground className="header__background" />

				<div className="header__text-container">
					<TehranLogo className="header__logo" />

					<nav>
						<ul>
							<li>
								<a href="/about-tehran">دربارۀ طهران</a>
							</li>
							<li>
								<a href="/forum">انجمن</a>
							</li>
							<li>
								<a href="/login">ورود</a>
							</li>
							<li>
								<a href="/signup">ثبت نام</a>
							</li>
						</ul>
					</nav>
				</div>
			</header>
		);
	}
}
