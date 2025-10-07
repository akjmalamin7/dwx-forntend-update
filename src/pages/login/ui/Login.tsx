import { LOGIN_SCHEMA } from "@/shared/redux/features/auth/auth.schema";
import type { LoginData } from "@/shared/redux/features/auth/auth.types";
import { useLoginMutation } from "@/shared/redux/features/auth/authApi";
import { Button, Input } from "@/shared/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginData>({
    resolver: yupResolver(LOGIN_SCHEMA),
    defaultValues: { email: "", password: "" },
  });

  const [login, { isLoading }] = useLoginMutation();
  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    try {
      await login(data).unwrap();
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="max-w-[300px] mx-auto mt-10">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="flex flex-col gap-4">
            <div>
              <Input
                size="sm"
                {...register("email")}
                type="text"
                placeholder="Username"
                error={{
                  status: !!errors.email,
                  message: errors.email?.message,
                }}
                readonly={isLoading}
              />
            </div>
            <div>
              <Input
                size="sm"
                {...register("password")}
                type="password"
                placeholder="Your password"
                readonly={isLoading}
                error={{
                  status: !!errors.password,
                  message: errors.password?.message,
                }}
              />
            </div>
            <Button
              loading={isLoading}
              disabled={!isValid}
              color="dark"
              size="size-2"
              width="full"
              type="submit"
            >
              {isLoading ? "Submitting..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
