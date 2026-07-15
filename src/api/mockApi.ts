import MockAdapter from "axios-mock-adapter";

import api from "../lib/axios";



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


export default mock;