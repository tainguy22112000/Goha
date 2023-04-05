import React from 'react';
import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';

import { protectedRoutes, publicRoutes } from '@/configs/routeConfig';
import ProtectedRoute from './protectedRoute';
import PublicRoute from './publicRoute';

function RootRoutes() {
	return (
		<RouterRoutes>
			<Route path="/" element={<ProtectedRoute />}>
				<Route path="/" element={<Navigate replace to="dashboard" />} />
				{protectedRoutes.map((route, index) => {
					const { component: Component, path, key } = route;
					return (
						<Route key={key + index} path={path} element={<Component />} />
					);
				})}
			</Route>

			<Route path="/login" element={<PublicRoute />}>
				{publicRoutes.map((route, index) => {
					const { component: Component, path, key } = route;
					return (
						<Route key={key + index} path={path} element={<Component />} />
					);
				})}
			</Route>
		</RouterRoutes>
	);
}

export default RootRoutes;
