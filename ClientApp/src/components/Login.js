import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { Route } from 'react-router';
import { Navigation } from './Navigation';

export class Login extends Component {
	static displayName = Login.name;

	render() {
		return (
			<div className="">
				<Navigation />
				<Container>{this.props.children}</Container>
			</div>
		);
	}
}
