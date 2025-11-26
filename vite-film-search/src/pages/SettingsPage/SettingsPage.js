import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Label, SwitchButton, Title } from "components";
import { useForm } from "react-hook-form";
import { getTheme, toggleTheme, updateUserProfile, useAppDispatch, useAppSelector } from "store";
import { Input } from "ui";
import { GroupButton, FormCard, DescSpan, FormSettings } from "./styles";
import { toast } from "react-toastify";
export const SettingsPage = () => {
    const { theme } = useAppSelector(getTheme);
    const dispatch = useAppDispatch();
    const handleTheme = (event) => {
        if (event.target.checked) {
            dispatch(toggleTheme("dark"));
        }
        else {
            dispatch(toggleTheme("light"));
        }
    };
    const inputChecked = theme === "dark" ? true : false;
    const { register, handleSubmit, reset, formState: { errors }, } = useForm({
        mode: "onBlur",
    });
    const onSubmit = ({ name, email, passwordConfirm, passwordNew }) => {
        if (passwordNew === passwordConfirm) {
            dispatch(updateUserProfile({ name, email, password: passwordNew, theme })).then(() => reset());
        }
        else {
            toast.warning("Passwords do not match");
        }
    };
    const onReset = () => reset();
    return (_jsxs(FormSettings, { onSubmit: handleSubmit(onSubmit), initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { ease: "easeInOut", duration: 0.5 }, children: [_jsx(Title, { option: "H2", text: "Profile" }), _jsxs(FormCard, { children: [_jsx(Label, { text: "Name", children: _jsx(Input, { placeholder: "Your name", type: "text", ...register("name", { required: true, pattern: /^[A-Z][a-z]+ [A-Z][a-z]+$/ }) }) }), _jsx(Label, { text: "Email", children: _jsx(Input, { placeholder: "Your email", type: "email", ...register("email", { required: true }) }) })] }), _jsx(Title, { option: "H2", text: "Password" }), _jsxs(FormCard, { children: [_jsx(Label, { text: "New Password", children: _jsx(Input, { placeholder: "New password", type: "password", "$error": errors.passwordNew && true, ...register("passwordNew", { required: true }) }) }), _jsx(Label, { text: "Confirm Password", children: _jsx(Input, { placeholder: "Confirm password", type: "password", "$error": errors.passwordConfirm && true, ...register("passwordConfirm", { required: true }) }) })] }), _jsx(Title, { option: "H2", text: "Color mode" }), _jsxs(FormCard, { children: [_jsx(Label, { text: "Dark", children: _jsx(DescSpan, { children: "Use dark theme" }) }), _jsx(SwitchButton, { onChange: handleTheme, checked: inputChecked })] }), _jsxs(GroupButton, { children: [_jsx(Button, { type: "button", text: "Cancel", option: "secondary", onClick: onReset }), _jsx(Button, { type: "submit", text: "Save", option: "primary" })] })] }));
};
