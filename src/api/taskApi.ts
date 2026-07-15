import api from "../lib/axios";
import type { Task } from "../types/task";


const delay = () =>
    new Promise(
        resolve =>
            setTimeout(resolve, 1000)
    );



export async function getTasks() {

    await delay();


    const response = await api.get("/tasks");


    return response.data;

}


export async function createTask(
    title:string,
    description:string
){

    await delay();


    const oldTasks =
        localStorage.getItem("tasks");


    const tasks:Task[] =
        JSON.parse(oldTasks || "[]");



    const newTask:Task = {

        id:Date.now(),

        title:title,

        description:description,

        completed:false

    };



    tasks.push(newTask);



    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );



    return newTask;

}


export async function updateTask(
    id:number,
    completed:boolean
){

    await delay();


    const oldTasks =
        localStorage.getItem("tasks");


    const tasks:Task[] =
        JSON.parse(oldTasks || "[]");



    const task = tasks.find(t => t.id === id);

    if(task){
        task.completed = completed;
    }



    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );



    return task;

}

export async function deleteTask(
    id:number
){

    await delay();


    const oldTasks =
        localStorage.getItem("tasks");


    const tasks:Task[] =
        JSON.parse(oldTasks || "[]");



    const filteredTasks = tasks.filter(t => t.id !== id);



    localStorage.setItem(
        "tasks",
        JSON.stringify(filteredTasks)
    );



    return true;

}
