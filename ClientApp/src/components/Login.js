import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Route } from 'react-router';
import { Navigation } from './Navigation';
import { Footer } from './Footer';

import './Signup.scss';

export class Login extends Component {
	static displayName = Login.name;

	focusHandler() {
		let parent = this.parentNode.parentNode;
		parent.classList.add('input-container--focus');
	}

	blurHandler() {
		if (this.value !== '') return;

		let parent = this.parentNode.parentNode;
		parent.classList.remove('input-container--focus');
	}

	componentDidMount() {
		const inputs = document.querySelectorAll('input');

		inputs.forEach((input) => {
			input.addEventListener('focus', this.focusHandler);
			input.addEventListener('blur', this.blurHandler);
		});
	}

	render() {
		return (
			<React.Fragment>
				<Navigation />

				<div className="form-wrapper">
					<span className="form-wrapper__title">وارد شوید!</span>
					<form action="" className="signup-form">
						<div className="input-container">
							<div className="input-container__icon">
								<i className="fa fa-user" />
							</div>
							<div>
								<h5>نام کاربری</h5>
								<input type="text" name="username" autoComplete="off" />
							</div>
						</div>

						<div className="input-container">
							<div className="input-container__icon">
								<i className="fa fa-lock" />
							</div>
							<div>
								<h5>رمز عبور</h5>
								<input type="text" name="password" autoComplete="off" />
							</div>
						</div>

						<input type="submit" className="singup-button" value="ورود" />

						<span className="signup-form__have-account">
							<a href="#">نام کاربری</a>
							<span> یا </span>
							<a href="#">رمز عبور </a>
							<span>خود را فراموش کردید؟</span>
						</span>
						<span className="signup-form__have-account">
							<span>کاربر جدید هستید؟ </span>
							<a href="#">ثبت نام کنید!</a>
						</span>
					</form>
				</div>

				<Footer />
			</React.Fragment>
		);
	}
}
