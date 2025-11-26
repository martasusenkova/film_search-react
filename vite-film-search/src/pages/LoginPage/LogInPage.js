import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Label, RouterLink, Title } from "components";
import { useForm } from "react-hook-form";
import { ROUTE } from "router";
import { signIn, useAppDispatch } from "store";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input, InputGroup } from "ui";
import { Text } from "./styles";
export const LogInPage = () => {
    const dispatch = useAppDispatch();
    const { handleSubmit, register, formState: { errors }, reset, } = useForm({ mode: "onBlur" });
    const navigate = useNavigate();
    const location = useLocation();
    const onSubmit = (dataSignIn) => {
        dispatch(signIn(dataSignIn))
            .unwrap()
            .then(() => {
            reset();
            const from = location.state?.from
                ?.pathname;
            navigate(from ?? ROUTE.HOME, { replace: true });
        })
            .catch(() => {
            // swallow rejection to avoid unhandled promise rejection; error is shown via toast in slice
        });
    };
    return (_jsxs(Form, { onSubmit: handleSubmit(onSubmit), animate: { scale: 1 }, initial: { scale: 0 }, exit: { scale: 0 }, transition: { ease: "easeInOut", duration: 0.4 }, children: [_jsx(Title, { option: "H2", text: "Sign In" }), _jsxs(InputGroup, { children: [_jsx(Label, { text: "Email", children: _jsx(Input, { placeholder: "Enter your Email", type: "email", autoComplete: "email", "$error": errors.email && true, ...register("email", { required: true }) }) }), _jsxs(Label, { text: "Password", children: [_jsx(Input, { placeholder: "Enter your password", type: "password", autoComplete: "current-password", "$error": errors.password && true, ...register("password", { required: true }) }), _jsx(RouterLink, { to: `${ROUTE.HOME + ROUTE.RESET_PASSWORD}`, children: "Forgot Password?" })] })] }), _jsx(Button, { text: "Sign in", option: "primary", type: "submit" }), _jsxs(Text, { children: ["Don't have an account?", " ", _jsx(RouterLink, { to: `${ROUTE.HOME + ROUTE.REGISTRATION}`, children: "Sign up" })] })] }));
};
