import { useState } from "react";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { signIn } from "@/app/services/api.services";
import AlertComponent from "@/app/components/alert/alert";
import "@/app/components/login/styles.css";

export const LoginComponent = () => {
  const router = useRouter();

  const { register, handleSubmit } = useForm();
  const [alert, setAlert] = useState<{
    severity: "error" | "success";
    message: string;
  } | null>(null);

  const handleAlertClose = () => {
    setAlert(null);
  };

  const formSubmit = (data: any) => {
    signIn(data as User)
      .then(() => {
        setAlert({ severity: "success", message: "Login successful!" });
        router.push("/");
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          const errorMessage =
            error.response?.data.error ||
            "An error occurred during registration.";
          setAlert({ severity: "error", message: errorMessage });
        } else {
          setAlert({
            severity: "error",
            message: "An error occurred during registration.",
          });
        }
      });
  };

  return (
    <div>
      {alert && (
        <AlertComponent
          severity={alert.severity}
          message={alert.message}
          onClose={handleAlertClose}
        />
      )}
      <div className="auth-frame">
        <h2>Login</h2>
        <form onSubmit={handleSubmit(formSubmit)}>
          <input
            {...register("email", { required: true })}
            placeholder="Email"
          />
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
          />
          <input type="submit" value="Login" />
        </form>

        <div className="register-link-container">
          <p>
            Don't have an account? <Link href="/register">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
