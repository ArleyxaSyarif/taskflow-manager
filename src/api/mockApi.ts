import MockAdapter from "axios-mock-adapter";

import api from "../lib/axios";
import type { Task } from "../types/task";



const mock =
new MockAdapter(api);



mock.onGet("/tasks")
.reply(()=>{


    const tasks =
    localStorage.getItem(
        "tasks"
    );


    return [
        200,
        JSON.parse(tasks || "[]")
    ];

});



mock.onPost("/tasks")
.reply(
(config)=>{


const body =
JSON.parse(config.data);



const tasks =
JSON.parse(
localStorage.getItem("tasks") || "[]"
);



const newTask = {

id:Date.now(),

title:body.title,

description:body.description,

completed:false

};



tasks.push(newTask);



localStorage.setItem(
"tasks",
JSON.stringify(tasks)
);



return [
201,
newTask
];


});


mock.onPut(/\/tasks\/\d+$/).reply((config) => {

    const id = Number(config.url?.split("/").pop());
    const body = JSON.parse(config.data);

    const tasks = JSON.parse(
        localStorage.getItem("tasks") || "[]"
    );

    const updatedTasks = tasks.map((t: Task) =>
        t.id === id
            ? { ...t, completed: body.completed }
            : t
    );

    localStorage.setItem(
        "tasks",
        JSON.stringify(updatedTasks)
    );

    return [
        200,
        updatedTasks.find((t: Task) => t.id === id)
    ];

});


mock.onDelete(/\/tasks\/\d+$/).reply((config) => {

    const id = Number(config.url?.split("/").pop());

    const tasks = JSON.parse(
        localStorage.getItem("tasks") || "[]"
    );

    const filteredTasks = tasks.filter(
        (t: Task) => t.id !== id
    );

    localStorage.setItem(
        "tasks",
        JSON.stringify(filteredTasks)
    );

    return [
        200,
        { success: true }
    ];

});


mock.onPost("/tasks/bulk-delete").reply((config) => {

    const body = JSON.parse(config.data);
    const ids = body.ids as number[];

    const tasks = JSON.parse(
        localStorage.getItem("tasks") || "[]"
    );

    const filteredTasks = tasks.filter(
        (t: Task) => !ids.includes(t.id)
    );

    localStorage.setItem(
        "tasks",
        JSON.stringify(filteredTasks)
    );

    return [
        200,
        { success: true }
    ];

});


export default mock;