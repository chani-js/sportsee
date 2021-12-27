import React from 'react';
import {useLocation } from 'react-router-dom';
import queryString from "query-string";

export default function ErrorPage() {
	const location = useLocation()
	const param = queryString.parse(location.search).msg
	return (
		<div>
			<h1>{JSON.parse(param)}</h1>
		</div>
	);
}
