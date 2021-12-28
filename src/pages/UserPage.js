import React from 'react';
import PropTypes from 'prop-types';

import LeftNav from '../components/LeftNav';
import Dashboard from '../components/Dashboard';
import styled from 'styled-components';

const Container = styled.div`
	display: grid;
	grid-template-columns: 117px auto;
	nav {
		grid-column: 1;
	}
	main {
		display:flex;
		flex-direction:column;
		padding:20px;
	}
`;

export default function UserPage({ match }) {
	return (
		<Container>
			<LeftNav />
			<Dashboard match={match} />
		</Container>
	);
}

UserPage.protTypes = {
	match: PropTypes.array.isRequired,
};
