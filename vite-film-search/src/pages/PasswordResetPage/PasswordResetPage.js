import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Label, Title } from "components";
import { useForm } from "react-hook-form";
import { resetPassword, useAppDispatch } from "store";
import { Form, Input } from "ui";
export const PasswordResetPage = () => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit, formState: { errors }, } = useForm();
    const onSubmit = ({ email }) => dispatch(resetPassword(email));
    return (_jsxs(Form, { onSubmit: handleSubmit(onSubmit), animate: { scale: 1 }, initial: { scale: 0 }, exit: { scale: 0 }, transition: { ease: "easeInOut", duration: 0.4 }, children: [_jsx(Title, { option: "H2", text: "Reset Password" }), _jsx(Label, { text: "Email", children: _jsx(Input, { placeholder: "Your email", type: "email", "$error": errors.email && true, ...register("email", { required: true }) }) }), _jsx(Button, { option: "primary", text: "Reset" })] }));
};
