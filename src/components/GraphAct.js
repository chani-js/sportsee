import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {
	ResponsiveContainer,
	BarChart,
	Tooltip,
	XAxis,
	YAxis,
	Bar,
	CartesianGrid,
} from 'recharts';
import PropTypes from 'prop-types';

import { getUserActivity } from '../services/api';
import ActivityChartTooltip from './GraphActTools';

const Container = styled.div`
@media only screen and (min-width: 1023px) {
	width:93%;
 }
 	width:50%;
	margin-bottom: 100px;
	height: 320px;
	border-radius: 5px;
	background-color: #fbfbfb;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.0212249);
	padding: 25px;
`;

const Header = styled.header`
	display: flex;
	justify-content: space-between;
	h2 {
		font-weight: 500;
		font-size: 15px;
		color: #20253a;
	}
`;

const Text = styled.p`
	font-weight: 500;
	font-size: 14px;
	color: #74798c;
	margin-left: 10px;
`;

const Dot = styled.div`
	height: 8px;
	width: 8px;
	border-radius: 50%;
	background-color: ${(props) => props.color};
	align-self: center;
	margin-left: 30px;
`;

const Legend = styled.div`
	display: flex;
	.units {
		display: flex;
	}
`;

export default function ActivityChart({ id }) {
	const [data, setData] = useState([]);
	const history = useHistory()
	useEffect(() => {
		const getData = async () => {
			const request = await getUserActivity(id);
			if (request.msg) return history.push ('/erreur404?msg='+request.msg);
			// Formats the date on the XAxis
			for (
				let i = 0, length = request.data.sessions.length;
				i < length;
				i++
			) {
				request.data.sessions[i] = {
					...request.data.sessions[i],
					day: i + 1,
				};
			}
			setData(request.data.sessions);
		};
		getData();
	}, [id,history]);

	// Data for the domains
	const kgArray = data.map((el) => el.kilogram);
	const minYKg = Math.min(...kgArray) - 1;
	const maxYKg = Math.max(...kgArray) + 1;

	const calArray = data.map((el) => el.calories);
	const minYCal = Math.min(...calArray) - 20;
	const maxYCal = Math.max(...calArray) + 20;

	return (
		<Container>
			<Header>
				<h2>Activit?? quotidienne</h2>
				<Legend>
					<div className='units'>
						<Dot color='#282D30' />
						<Text>Poids (kg)</Text>
					</div>
					<div className='units'>
						<Dot color='#E60000' />
						<Text>Calories br??l??es (kCal)</Text>
					</div>
				</Legend>
			</Header>
			<ResponsiveContainer width='100%' height='100%'>
				<BarChart
					margin={{
						top: 50,
					}}
					data={data}
					barGap={8}
					barCategoryGap={1}
				>
					<CartesianGrid vertical={false} strokeDasharray='2 2' />
					<Tooltip content={<ActivityChartTooltip />} />
					<XAxis dataKey='day' axisLine={false} tickLine={false} />
					<YAxis
						yAxisId='kg'
						datakey='kilogram'
						orientation='right'
						domain={[minYKg, maxYKg]}
						tickCount={4}
						axisLine={false}
						tickLine={false}
					/>
					<YAxis
						yAxisId='cal'
						datakey='calories'
						hide={true}
						domain={[minYCal, maxYCal]}
					/>
					<Bar
						yAxisId='kg'
						dataKey='kilogram'
						fill='#282D30'
						barSize={7}
						radius={[50, 50, 0, 0]}
					/>
					<Bar
						yAxisId='cal'
						dataKey='calories'
						fill='#E60000'
						barSize={7}
						radius={[50, 50, 0, 0]}
					/>
				</BarChart>
			</ResponsiveContainer>
		</Container>
	);
}

ActivityChart.propTypes = {
	id: PropTypes.string.isRequired,
};
