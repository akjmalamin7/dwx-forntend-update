import { LOGIN_SCHEMA } from "@/shared/redux/features/auth/auth.schema";
import type { LoginData } from "@/shared/redux/features/auth/auth.types";
import { useLoginMutation } from "@/shared/redux/features/auth/authApi";
import { Button, Input, Text } from "@/shared/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
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
    <div className="bg-white shadow-[0_10px_30px_rgba(0,0,0,0.25)] rounded-xl p-6 mb-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        className="space-y-4"
      >
        <div className="flex flex-col gap-4">
          <div>
            <Text element="label" className="block text-gray-700 mb-1">
              Username
            </Text>
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
            <Text element="label" className="block text-gray-700 mb-1">
              Password
            </Text>
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
            type="submit"
          >
            {isLoading ? "Submitting..." : "Login"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
