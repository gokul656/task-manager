import { LoginComponent } from "@/app/components/login/login";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Landing() {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [show, setShow] = useState(false);
    const formData = watch();

    const formSubmit = (data: any) => {
        setShow(true);
    };

    return (
        <div>
            <LoginComponent />
        </div>
    );
}
