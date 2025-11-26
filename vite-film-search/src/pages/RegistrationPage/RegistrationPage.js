import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Label, RouterLink, Title } from "components";
import { useForm } from "react-hook-form";
import { ROUTE } from "router";
import { signUp, useAppDispatch } from "store";
import { Form, Input, InputGroup } from "ui";
import { Text } from "./styles";
import { toast } from "react-toastify";
export const RegistrationPage = () => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors }, reset, } = useForm({ mode: "onSubmit" });
    const onSubmit = ({ name, email, password, passwordConfirm, }) => {
        if (password === passwordConfirm) {
            dispatch(signUp({ name, email, password }))
                .unwrap()
                .then(() => {
                reset();
            });
        }
        else {
            toast.warning("Passwords do not match");
        }
    };
    if (errors.name)
        toast.warning("Fullname is not correct. Please enter correct fullname in format(only Latin words)");
    return (_jsxs(Form, { onSubmit: handleSubmit(onSubmit), animate: { scale: 1 }, initial: { scale: 0 }, exit: { scale: 0 }, transition: { ease: "easeInOut", duration: 0.4 }, children: [_jsx(Title, { option: "H2", text: "Sign Up" }), _jsxs(InputGroup, { children: [_jsx(Label, { text: "Fullname", children: _jsx(Input, { placeholder: "Your fullname(Name Surname)", type: "text", "$error": errors.name && true, ...register("name", { required: true, pattern: /^[A-Z][a-z]+ [A-Z][a-z]+$/ }) }) }), _jsx(Label, { text: "Email", children: _jsx(Input, { placeholder: "Your email", type: "email", "$error": errors.email && true, ...register("email", { required: true }) }) }), _jsx(Label, { text: "Password", children: _jsx(Input, { placeholder: "Your password", type: "password", "$error": errors.password && true, ...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Minimum characters 6" },
                            }) }) }), _jsx(Label, { text: "Confirm Password", children: _jsx(Input, { placeholder: "Confirm password", type: "password", "$error": errors.passwordConfirm && true, ...register("passwordConfirm", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Minimum characters 6" },
                            }) }) })] }), _jsx(Button, { text: "Sign up", option: "primary", type: "submit" }), _jsxs(Text, { children: ["Already have an account? ", _jsx(RouterLink, { to: `${ROUTE.HOME + ROUTE.LOGIN}`, children: "Sign In" })] })] }));
};
