import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Background, FilterHeader, Filters, GroupButton, StyledFilterMenu } from "./styles";
import { Controller, useForm } from "react-hook-form";
import { generatePath, useNavigate, createSearchParams } from "react-router-dom";
import { CrossIcon } from "assets";
import { Icon } from "components";
import { Input, InputGroup } from "ui";
import { ROUTE } from "router";
import { Button, Label, MovieType, CustomSelect, Portal, Title, portalTarget } from "components";
const options = [
    { value: MovieType.MOVIES, label: "Movie" },
    { value: MovieType.SERIES, label: "Series" },
    { value: MovieType.EPISODE, label: "Episode" },
];
export const FilterMenu = ({ toogleFilter }) => {
    const { register, handleSubmit, reset, control, formState: { errors }, } = useForm({ mode: "onBlur", defaultValues: { movieType: options[0] } });
    const navigate = useNavigate();
    const handleCross = () => toogleFilter();
    const onSubmit = (filterData) => {
        const { year, title, movieType } = filterData;
        toogleFilter();
        navigate(`${generatePath(ROUTE.SEARCH, { name: title })}?${createSearchParams({
            year,
            type: movieType.value,
        })}`);
    };
    const handleClear = () => reset();
    return (_jsx(Portal, { target: portalTarget.MODAL, children: _jsxs(StyledFilterMenu, { children: [_jsx(Background, { onClick: toogleFilter, initial: { opacity: 0 }, animate: { opacity: 0.5 }, exit: { opacity: 0 }, transition: { ease: "easeInOut" } }), _jsxs(Filters, { onSubmit: handleSubmit(onSubmit), initial: { x: 1000, opacity: 0 }, animate: { x: 0, opacity: 1 }, transition: { ease: "easeInOut" }, exit: { x: 1000, opacity: 0 }, children: [_jsxs(FilterHeader, { children: [_jsx(Title, { option: "H2", text: "Filters" }), _jsx(Icon, { icon: CrossIcon, onClick: handleCross })] }), _jsxs(InputGroup, { children: [_jsx(Label, { text: "Full or short movie name", children: _jsx(Input, { placeholder: "Type title", ...register("title", { required: true }), "$error": errors.title && true }) }), _jsx(Label, { text: "Year", children: _jsx(Input, { placeholder: "Type year", type: "number", max: "2023", min: "1970", ...register("year", { required: false }), "$error": errors.year && true }) }), _jsx(Label, { text: "Movie type", children: _jsx(Controller, { name: "movieType", rules: { required: true }, control: control, render: ({ field: { onChange, value } }) => (_jsx(CustomSelect, { options: options, value: options.find((option) => option.value === value?.value), defaultValue: options[0], onChange: (option) => onChange(option) })) }) })] }), _jsxs(GroupButton, { children: [_jsx(Button, { type: "button", text: "Clear filter", option: "secondary", onClick: handleClear }), _jsx(Button, { type: "submit", text: "Show results", option: "primary" })] })] })] }) }));
};
