import { Button, Label, RouterLink, Title } from "components";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { ROUTE } from "router";
import { signIn, useAppDispatch } from "store";
import { useLocation, useNavigate } from "react-router-dom";
import { Form, Input, InputGroup } from "ui";
import { Text } from "./styles";

interface LoginData {
  email: string;
  password: string;
}

export const LogInPage = () => {
  const dispatch = useAppDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<LoginData>({ mode: "onBlur" });

  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit: SubmitHandler<LoginData> = (dataSignIn) => {
    dispatch(signIn(dataSignIn))
      .unwrap()
      .then(() => {
        reset();
        const from = (location.state as { from?: { pathname?: string } } | undefined)?.from
          ?.pathname;
        navigate(from ?? ROUTE.HOME, { replace: true });
      })
      .catch(() => {
        // swallow rejection to avoid unhandled promise rejection; error is shown via toast in slice
      });
  };

  return (
    <Form
      onSubmit={handleSubmit(onSubmit)}
      animate={{ scale: 1 }}
      initial={{ scale: 0 }}
      exit={{ scale: 0 }}
      transition={{ ease: "easeInOut", duration: 0.4 }}
    >
      <Title option="H2" text="Sign In" />
      <InputGroup>
        <Label text="Email">
          <Input
            placeholder="Enter your Email"
            type="email"
            autoComplete="email"
            $error={errors.email && true}
            {...register("email", { required: true })}
          />
        </Label>
        <Label text="Password">
          <Input
            placeholder="Enter your password"
            type="password"
            autoComplete="current-password"
            $error={errors.password && true}
            {...register("password", { required: true })}
          />
          <RouterLink to={`${ROUTE.HOME + ROUTE.RESET_PASSWORD}`}>Forgot Password?</RouterLink>
        </Label>
      </InputGroup>
      <Button text="Sign in" option="primary" type="submit" />
      <Text>
        Don't have an account?{" "}
        <RouterLink to={`${ROUTE.HOME + ROUTE.REGISTRATION}`}>Sign up</RouterLink>
      </Text>
    </Form>
  );
};
