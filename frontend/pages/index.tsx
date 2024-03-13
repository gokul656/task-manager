import React, { useEffect, useLayoutEffect, useState } from "react";
import "@/app/globals.css";
import TaskComponent from "@/app/components/task/task";
import { AppBarComponent } from "@/app/components/app_bar/app_bar";
import { redirect } from "next/navigation";
import { getAllTasks } from "@/app/services/api.services";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

interface MainProps { }

const Main: React.FC<MainProps> = () => {
    const [tasks, setTasks] = useState<Task[]>([])
    const [state, setState] = useState<string>("")
    const router = useRouter()

    useEffect(() => {
        if (getCookie('token')) {
            router.push('/')
        }
        getTasks()
    }, [state])


    const getTasks = async () => {
        const tasks = getAllTasks()
        tasks.then((data) => setTasks(data.data)).catch((err) => { })
    }

    return (
        <div className="root-layout">
            <AppBarComponent />
            <TaskComponent data={tasks} setState={setState}></TaskComponent>
        </div>
    );
};

export default Main;
