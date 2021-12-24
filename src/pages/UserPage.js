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
		grid-column: 2;
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
