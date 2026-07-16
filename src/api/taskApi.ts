import toast from "react-hot-toast";
import api from "../lib/axios";
import type { Task } from "../types/task";


const delay = () =>
    new Promise(
        resolve =>
            setTimeout(resolve, 1000)
    );



export async function getTasks(): Promise<Task[]> {

    await delay();


    const response = await api.get("/tasks");


    return response.data as Task[];

}


export async function createTask(
    title: string,
    description: string
): Promise<Task> {

    await delay();

    const response = await api.post("/tasks", {
        title,
        description,
    });

    toast.success("Task berhasil ditambahkan");
    return response.data as Task;

}

export async function updateTask(
    id: number,
    completed: boolean
): Promise<Task> {

    await delay();


    const response = await api.put(`/tasks/${id}`, {
        completed,
    });

    toast.success("Task berhasil diupdate");

    return response.data as Task;

}

export async function deleteTask(
    id: number
): Promise<{ success: boolean }> {

    await delay();

    const response = await api.delete(`/tasks/${id}`);

    toast.success("Task berhasil dihapus");
    return response.data as { success: boolean };

}

export async function bulkDeleteTasks(
    ids: number[]
) {

    await delay();

    const response =
        await api.post(
            "/tasks/bulk-delete",
            { ids }
        );

    return response.data;

}