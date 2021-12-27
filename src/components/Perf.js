import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
	RadarChart,
	PolarGrid,
	Radar,
	PolarAngleAxis,
	ResponsiveContainer,
} from 'recharts';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { getUserPerformance } from '../services/api.js';

const Container = styled.div`
	height: 263px;
	width: 258px;
	background: #282d30;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0212249);
	border-radius: 5px;
`;

export default function PerformanceChart({ id }) {
	const history = useHistory()
	const [data, setData] = useState([]);

	useEffect(() => {
		const getData = async () => {
			const request = await getUserPerformance(id);
			if (request.msg) return history.push ('/erreur404?msg='+request.msg);
			// Formats data and capitalizes the first letter of each kind
			for (let i = 0, size = request.data.data.length; i < size; i++) {
				request.data.data[i] = {
					...request.data.data[i],
					kind:
						request.data.kind[request.data.data[i].kind]
							.charAt(0)
							.toUpperCase() +
						request.data.kind[request.data.data[i].kind].slice(1),
				};
			}

			setData(request.data.data);
		};
		getData();
	}, [id,history]);

	return (
		<Container>
			<ResponsiveContainer width='100%' height='100%'>
				<RadarChart cx='50%' cy='50%' outerRadius='60%' data={data}>
					<PolarGrid />
					<PolarAngleAxis
						dataKey='kind'
						stroke='white'
						tickLine={false}
						tick={{ fontSize: 11 }}
					/>
					<Radar
						dataKey='value'
						stroke='#FF0101'
						fill='#FF0101'
						fillOpacity={0.7}
					/>
				</RadarChart>
			</ResponsiveContainer>
		</Container>
	);
}

PerformanceChart.propTypes = {
	id: PropTypes.string.isRequired,
};
