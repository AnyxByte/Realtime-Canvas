import React, { useState } from "react";
import { ArrowLeft, Github, Chrome, Mail, Lock, User, Zap } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    console.log("values:-", values);
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      const payload = {};
      payload.email = values.email;
      payload.password = values.password;
      if (!isLogin) {
        payload.username = values.username;
        await axios.post(`${backendUrl}/api/auth/register`, payload);
        setIsLogin(true);
        toast.success("Registered successfull");
      } else {
        const response = await axios.post(
          `${backendUrl}/api/auth/login`,
          payload,
        );
        Cookies.set("token", response.data.token);
        toast.success("Login successfull");
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error("Error");
      console.log("error:-", error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans relative flex items-center justify-center p-6 overflow-hidden">
      {/* Background Grid - Matching Landing Page */}
      <div
        className="fixed inset-0 z-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#4f46e5 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px",
        }}
      ></div>

      {/* Floating Blobs for a bit of "Creative" flair */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/30 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-200/30 blur-[120px] rounded-full"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Back to Home */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-8 transition-colors group"
        >
          <ArrowLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          <span className="font-medium">Back to site</span>
        </a>

        {/* Auth Card */}
        <div className="bg-white/80 backdrop-blur-2xl border border-white rounded-[2.5rem] shadow-2xl p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-200 mb-4">
              <Zap fill="currentColor" size={24} />
            </div>
            <h1 className="text-3xl font-black tracking-tight italic">
              {isLogin ? "Welcome back." : "Join the flow."}
            </h1>
            <p className="text-slate-500 mt-2 font-medium">
              {isLogin
                ? "Your infinite canvas is waiting."
                : "Start creating in real-time today."}
            </p>
          </div>

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all font-semibold text-sm">
              <Chrome size={18} /> Google
            </button>
            <button className="flex items-center justify-center gap-2 py-3 border border-slate-200 rounded-2xl hover:bg-slate-50 transition-all font-semibold text-sm">
              <Github size={18} /> GitHub
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-4 text-slate-400 font-bold tracking-widest">
                Or continue with email
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">
                  Username
                </label>
                <div className="relative">
                  <User
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={18}
                  />
                  <input
                    type="text"
                    placeholder="john"
                    className="w-full pl-12 pr-4 py-4 bg-slate-100/50 border border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                    {...register("username", {
                      required: "username is required",
                    })}
                  />
                </div>
                {errors.username && (
                  <span className="text-red-500">
                    {errors?.username?.message}
                  </span>
                )}
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full pl-12 pr-4 py-4 bg-slate-100/50 border border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                  {...register("email", {
                    required: "email is required",
                  })}
                />
              </div>
              {errors.email && (
                <span className="text-red-500">{errors?.email?.message}</span>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-sm font-bold text-slate-700">
                  Password
                </label>
                {isLogin && (
                  <a
                    href="#"
                    className="text-xs font-bold text-indigo-600 hover:underline"
                  >
                    Forgot?
                  </a>
                )}
              </div>
              <div className="relative">
                <Lock
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-slate-100/50 border border-transparent focus:border-indigo-500 focus:bg-white rounded-2xl outline-none transition-all font-medium"
                  {...register("password", {
                    required: "password is required",
                  })}
                />
              </div>
              {errors.password && (
                <span className="text-red-500">
                  {errors?.password?.message}
                </span>
              )}
            </div>

            <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-600 hover:shadow-xl hover:shadow-indigo-200 transition-all active:scale-[0.98] mt-4">
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Toggle Footer */}
          <p className="text-center mt-8 text-slate-500 font-medium">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-indigo-600 font-bold hover:underline transition-all"
            >
              {isLogin ? "Sign up free" : "Log in"}
            </button>
          </p>
        </div>

        {/* Footer Note */}
        <p className="text-center mt-8 text-slate-400 text-xs px-10 leading-relaxed">
          By continuing, you agree to CanvasFlow's <br />
          <span className="underline cursor-pointer">
            Terms of Service
          </span> and{" "}
          <span className="underline cursor-pointer">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}

export default Auth;
