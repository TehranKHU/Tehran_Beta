import React, { Component } from 'react';
import './Footer.scss';

import FooterBackground from '../svg/footer_background';

export class Footer extends Component {
	static displayName = Footer.name;

	render() {
		return (
			<footer>
				<FooterBackground className="footer__background" />

				<div className="footer__text-container">
					کلیۀ حقوق مادی و معنوی این سایت متعلق به گروه طهران می‌باشد.
				</div>
			</footer>
		);
	}
}
