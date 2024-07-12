import Shield from "@/app/icons/Shield";
import User from "@/app/icons/User";
import { Input } from "@nextui-org/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect } from "react";
import { IFormLogin } from "@/app/types/auth";
import { useLogin } from "@/app/hooks/auth";

export default function LoginSection() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
    reset,
  } = useForm<IFormLogin>();

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful]);

  const login = useLogin();
  const onSubmit: SubmitHandler<IFormLogin> = async (data) => {
    login.mutate(data);
  };

  return (
    <div className="flex-1 flex justify-center pt-[104px] bg-main">
      <div className="w-[470px] mb-[40px]">
        <div className="flex_center h-[102px] bg-main_blue">
          <img src="/images/logo_1.png" alt="" className="h-[39px] object-contain" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="pt-[40px] pb-[30px] px-[55px] flex_col items-center bg-white">
          <span className=" font-montserrat-600 text-[24px] mb-[30px]">Вход</span>
          <Input
            {...register("email", {
              required: "Введите email",
              pattern: {
                value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                message: "Введите корректный email",
              },
            })}
            type="text"
            variant="bordered"
            autoComplete="new-login"
            placeholder="Логин"
            labelPlacement="outside"
            startContent={<User width={17} />}
            classNames={{
              input: "bg-transparent placeholder:text-main_text ml-[5px] text-[14px]",
              innerWrapper: "bg-transparent  ",
              inputWrapper: "border border-[#A8B7C7] font-montserrat-500 text-main_text py-[16px] h-auto focus:-within-main_blue",
            }}
          />
          {errors.email && <span className=" text-red-500 text-[14px] font-montserrat-500 mt-[4px] w-full">{errors.email.message}</span>}
          <Input
            {...register("password", {
              required: "Введите пароль",
              minLength: {
                value: 8,
                message: "Пароль должен содержать минимум 8 символов",
              },
            })}
            autoComplete="new-password"
            type="password"
            variant="bordered"
            placeholder="Пароль"
            labelPlacement="outside"
            startContent={<Shield width={17} />}
            classNames={{
              input: "bg-transparent placeholder:text-main_text ml-[5px] autofill:bg-transparent text-[14px]",
              innerWrapper: "bg-transparent  autofill:bg-transparent",
              inputWrapper: "border border-[#A8B7C7] font-montserrat-500 text-main_text py-[16px] h-auto focus:-within-main_blue mt-[10px]",
            }}
          />
          {errors.password && (
            <span className=" text-red-500 text-[14px] font-montserrat-500 mt-[4px] w-full">{errors.password.message}</span>
          )}
          <button
            type="submit"
            className="w-full hover:brightness-125 text-[14px] h-[67px] bg-main_blue rounded-[10px] flex_center font-montserrat-600 text-white mt-[19px] mb-[31px] "
          >
            Войти
          </button>
          <span className=" font-montserrat-600 text-main_blue mb-[30px] cursor-pointer">Забыли пароль?</span>
          <div className=" border-dashed border-[#BFC4C8] w-full border-t"></div>
          <button className="w-full hover:brightness-125 text-[14px] h-[67px] bg-[#F8C35D] rounded-[10px] flex_center font-montserrat-600 text-white mt-[30px]">
            Зарегистрироваться
          </button>
        </form>
      </div>
    </div>
  );
}
