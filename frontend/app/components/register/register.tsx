import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import { AxiosError } from "axios";
import { signUp } from "@/app/services/api.services";
import { ApiErrorResponse } from "@/app/types/response";
import AlertComponent from "@/app/components/alert/alert";
import "@/app/components/register/styles.css";

export const RegisterComponent = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const router = useRouter();
  const [alert, setAlert] = useState<{
    severity: "error" | "success";
    message: string;
  } | null>(null);
  const formData = watch();

  const formSubmit = (data: any) => {
    signUp(data as User)
      .then(() => {
        setAlert({ severity: "success", message: "Registration successful!" });
        setTimeout(() => router.push("/"), 1000);
      })
      .catch((error) => {
        if (error instanceof AxiosError) {
          const err = error as AxiosError<ApiErrorResponse>;
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

  const handleAlertClose = () => {
    setAlert(null);
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
        <h2>Register</h2>
        <form onSubmit={handleSubmit(formSubmit)}>
          <input
            {...register("email", { required: true })}
            placeholder="Email"
          />
          {errors.email && (
            <span className="error-message">Email is required</span>
          )}
          <input
            {...register("password", { required: true })}
            type="password"
            placeholder="Password"
          />
          {errors.password && (
            <span className="error-message">Password is required</span>
          )}
          <input
            {...register("confirmPassword", {
              required: true,
              validate: (value) =>
                value === formData.password || "The passwords do not match",
            })}
            type="password"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <span className="error-message">The passwords do not match</span>
          )}
          <input type="submit" value="Sign up" />
        </form>
        <div className="register-link-container">
          <p>
            Already have an account? <Link href="/login">Sign in</Link> instead.
          </p>
        </div>
      </div>
    </div>
  );
};
