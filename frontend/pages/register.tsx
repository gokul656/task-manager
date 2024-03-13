import { RegisterComponent } from "@/app/components/register/register";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Landing() {
    const router = useRouter()

    useEffect(() => {
        const token = getCookie("token");
        if (token) {
            router.push('/login')
        }
    }, [])

    return (
        <div>
            <RegisterComponent />
        </div>
    );
}
