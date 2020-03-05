import React from 'react';

const SVG = (props) => (
	<span className={props.className}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			width="206"
			height="136"
			viewBox="0 0 206 136"
		>
			<defs>
				<filter id="a" x="0" y="0" width="206" height="136" filterUnits="userSpaceOnUse">
					<feOffset dx="6" dy="6" input="SourceAlpha" />
					<feGaussianBlur stdDeviation="3" result="b" />
					<feFlood flood-opacity="0.161" />
					<feComposite operator="in" in2="b" />
					<feComposite in="SourceGraphic" />
				</filter>
			</defs>
			<g transform="translate(-1710 -17)">
				<g transform="matrix(1, 0, 0, 1, 1710, 17)" filter="url(#a)">
					<text
						transform="translate(97 86)"
						fill="#e64e4e"
						font-size="72"
						font-family="Sahel-Black, Sahel"
						font-weight="800"
					>
						<tspan x="-93.305" y="0">
							طهران
						</tspan>
					</text>
				</g>
			</g>
		</svg>
	</span>
);

export default SVG;
