import { useDeleteTask } from "../../hooks/useDeleteTask";
import { useUpdateTask } from "../../hooks/useUpdateTask";
import type { Task } from "../../types/task";


interface Props {

    task: Task;

}


export default function TaskCard({
    task
}: Props) {


    const updateTask =
        useUpdateTask();


    const deleteTask =
        useDeleteTask();



    return (

        <div>


            <input

                type="checkbox"

                checked={task.completed}


                onChange={() => {

                    updateTask.mutate({
                        id: task.id,
                        completed: !task.completed
                    })

                }}

            />



            <span>

                {task.title}

                {task.description}

            </span>



            <button

                onClick={() => {

                    deleteTask.mutate(task.id)

                }}

            >

                Hapus

            </button>



        </div>

    )

}