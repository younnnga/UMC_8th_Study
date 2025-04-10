import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { postSignup } from '../apis/auth';

const schema = z.object({
  email: z.string().email({message: "올바른 이메일 형식이 아닙니다."}),
  password: z
    .string()
    .min(8, { 
      message: "비밀번호는 8자 이상이어야 합니다.",
  })
    .max(20,{
      message: "비밀번호는 20자 이하여야 합니다.",
    }),
  passwordCheck: z
  .string()
    .min(8, { 
      message: "비밀번호는 8자 이상이어야 합니다.",
  })
    .max(20,{
      message: "비밀번호는 20자 이하여야 합니다.",
    }),
  name: z.string().min(1,{message: "이름을 입력해주세요."}),
  })
  .refine((data)=>data.password === data.passwordCheck, {
    message: "비밀번호가 일치하지 않습니다.",
    path:["passwordCheck"],
  });

type FormFields = z.infer<typeof schema>

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting},
  } = useForm<FormFields>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      passwordCheck:"",
    },
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit : SubmitHandler<FormFields> = async(data) => {
    console.log(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {passwordCheck,...rest} = data;

    const response = await postSignup(rest)

    console.log(response);
  };

  return (
    <div className='flex flex-col items-center justify-center h-full gap-4'>
      <div className="flex flex-col gap-3">
        <input
          {...register('email')}
          className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors?.email? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type={"email"}
          placeholder={"이메일"}
        />
        {errors.email && <div className={'text-red-500 text-sm'}>{errors.email.message}</div>}
      

        <input
          {...register("password")}
          className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors?.password? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type={"password"}
          placeholder={"비밀번호"}
        />
        {errors.password && <div className={'text-red-500 text-sm'}>{errors.password.message}</div>}

        <input
          {...register("passwordCheck")}
          className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors?.passwordCheck? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type={"password"}
          placeholder={"비밀번호"}
        />
        {errors.passwordCheck && <div className={'text-red-500 text-sm'}>{errors.passwordCheck.message}</div>}


        <input
          {...register("name")}
          className={`border w-[300px] p-[10px] focus:border-[#807bff] rounded-sm
            ${errors?.name? "border-red-500 bg-red-200" : "border-gray-300"}`}
          type={"name"}
          placeholder={"이름"}
        />
        {errors.name && <div className={'text-red-500 text-sm'}>{errors.name.message}</div>}

        <button
          disabled={isSubmitting}
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="w-full bg-pink-500 text-white py-3 rounded-md text-lg font-medium hover:bg-pink-700 transition-colors cursor-pointer disabled:bg-gray-300"
        >
          회원가입
        </button>
      </div>
    </div>
  );

}

export default SignUpPage
