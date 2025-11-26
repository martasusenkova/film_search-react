import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MainTemplate } from "components/MainTemplate/MainTemplate";
import { AuthTemplate } from "components/AuthTemplate/AuthTemplate";
import { AuthRequiredTemplate } from "components/AuthRequiredTemplate/AuthRequiredTemplate";
import { DetailsPage, ErrorPage, FavoritesPage, HomePage, LogInPage, RegistrationPage, PasswordResetPage, SearchPage, SettingsPage, TrendsPage, } from "pages";
import { Route, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { ROUTE } from "router";
export const router = createBrowserRouter(createRoutesFromElements(_jsxs(Route, { path: ROUTE.HOME, errorElement: _jsx(ErrorPage, {}), children: [_jsxs(Route, { element: _jsx(MainTemplate, {}), children: [_jsx(Route, { index: true, element: _jsx(HomePage, {}) }), _jsx(Route, { path: ROUTE.TRENDS, element: _jsx(TrendsPage, {}) }), _jsx(Route, { path: ROUTE.MOVIE, element: _jsx(DetailsPage, {}) }), _jsx(Route, { path: ROUTE.SEARCH, element: _jsx(SearchPage, {}) }), _jsxs(Route, { element: _jsx(AuthRequiredTemplate, {}), children: [_jsx(Route, { path: ROUTE.FAVORITES, element: _jsx(FavoritesPage, {}) }), _jsx(Route, { path: ROUTE.SETTINGS, element: _jsx(SettingsPage, {}) })] })] }), _jsxs(Route, { element: _jsx(AuthTemplate, {}), children: [_jsx(Route, { path: ROUTE.REGISTRATION, element: _jsx(RegistrationPage, {}) }), _jsx(Route, { path: ROUTE.LOGIN, element: _jsx(LogInPage, {}) }), _jsx(Route, { path: ROUTE.RESET_PASSWORD, element: _jsx(PasswordResetPage, {}) })] })] })));
