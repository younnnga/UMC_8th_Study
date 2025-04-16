import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { postSignup } from "../apis/auth";
import { Eye, EyeOff } from "lucide-react";
import { RequestSignupDto } from '../types/auth';

const schema = z.object({
  email: z.string().email({ message: "올바른 이메일 형식이 아닙니다." }),
  password: z.string().min(8, { message: "비밀번호는 8자 이상이어야 합니다." }).max(20),
  passwordCheck: z.string().min(8).max(20),
  name: z.string().min(1, { message: "이름을 입력해주세요." }),
  avatar: z.any().optional(),
}).refine((data) => data.password === data.passwordCheck, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordCheck"],
});

type FormFields = z.infer<typeof schema>;

const SignUpPage = () => {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordCheck, setShowPasswordCheck] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      passwordCheck: "",
      name: "",
    },
  });

  const onSubmit = async (data: FormFields) => {
    const { email, password, name, avatar } = data;

    let avatarString = "";
    const file = avatar?.[0];
    if (file) {
      avatarString = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    const requestData: RequestSignupDto = {
      email,
      password,
      name,
      bio: "",
      avatar: avatarString,
    };

    try {
      const response = await postSignup(requestData);
      console.log("회원가입 성공!", response);
      navigate("/login");
    } catch (error) {
      console.error("회원가입 실패:", error);
    }
  };

  const avatarPreview = watch("avatar")?.[0]
    ? URL.createObjectURL(watch("avatar")[0])
    : null;

  return (
    <div className="flex flex-col items-center justify-center h-full gap-6 p-4">
      {step === 1 && (
        <>
          <div className="relative w-[300px] h-10 mb-2 flex items-center justify-center">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-0 text-white text-xl"
            >
              &lt;
            </button>
            <div className="text-white text-lg font-semibold">회원가입</div>
          </div>

          <button
            type="button"
            className="relative w-[300px] py-2 border border-gray-400 rounded-md bg-transparent text-white hover:bg-gray-100 hover:text-black transition"
          >
            <img
              src="https://img.icons8.com/color/48/google-logo.png"
              alt="google"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5"
            />
            <span className="block text-center w-full">구글 로그인</span>
          </button>

          <div className="flex items-center w-[300px] my-2">
            <hr className="flex-grow border-gray-600" />
            <span className="px-2 text-gray-400 text-sm">OR</span>
            <hr className="flex-grow border-gray-600" />
          </div>

          <input
            {...register("email")}
            type="email"
            placeholder="이메일"
            className={`border p-2 rounded w-72 ${errors.email ? "border-red-500 bg-red-100" : "border-gray-300"}`}
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <button
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded w-72"
            onClick={() => setStep(2)}
          >
            다음
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <div className="relative w-72">
            <input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호"
              className={`border p-2 rounded w-full ${errors.password ? "border-red-500 bg-red-100" : "border-gray-300"}`}
            />
            <button
              type="button"
              className="absolute right-2 top-2"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <div className="relative w-72">
            <input
              {...register("passwordCheck")}
              type={showPasswordCheck ? "text" : "password"}
              placeholder="비밀번호 확인"
              className={`border p-2 rounded w-full ${errors.passwordCheck ? "border-red-500 bg-red-100" : "border-gray-300"}`}
            />
            <button
              type="button"
              className="absolute right-2 top-2"
              onClick={() => setShowPasswordCheck((prev) => !prev)}
            >
              {showPasswordCheck ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.passwordCheck && <p className="text-red-500 text-sm">{errors.passwordCheck.message}</p>}

          <button
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded w-72"
            onClick={() => setStep(3)}
          >
            다음
          </button>
        </>
      )}

      {step === 3 && (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-3">
          <label className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center cursor-pointer">
            {avatarPreview ? (
              <img src={avatarPreview} alt="avatar" className="object-cover w-full h-full" />
            ) : (
              <span className="text-gray-500 text-sm">아바타</span>
            )}
            <input
              type="file"
              accept="image/*"
              {...register("avatar")}
              className="hidden"
              onChange={(e) => setValue("avatar", e.target.files)}
            />
          </label>

          <input
            {...register("name")}
            placeholder="이름"
            className={`border p-2 rounded w-72 ${errors.name ? "border-red-500 bg-red-100" : "border-gray-300"}`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

          <button
            disabled={isSubmitting}
            type="submit"
            className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded w-72 disabled:bg-gray-300"
          >
            회원가입 완료
          </button>
        </form>
      )}
    </div>
  );
};

export default SignUpPage;