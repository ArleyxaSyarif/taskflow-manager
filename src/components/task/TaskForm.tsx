import {
    useForm
} from "react-hook-form";


import {
    zodResolver
} from "@hookform/resolvers/zod";


import {
    taskSchema,
    type TaskFormData
} from "../../schemas/taskSchema";


import {
    useCreateTask
} from "../../hooks/useCreateTask";



export default function TaskForm() {


    const createTask =
        useCreateTask();



    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors
        }

    } = useForm<TaskFormData>({

        resolver:
            zodResolver(taskSchema)

    });



    function onSubmit(data: TaskFormData) {


        createTask.mutate(
            {
                title: data.title,
                description: data.description
            }
        );


        reset();

    }



    return (

        <form

            onSubmit={
                handleSubmit(onSubmit)
            }

        >


            <input

                className="border p-2"

                placeholder="Tambah task"

                {...register("title")}

            />
            <input

                className="border p-2"

                placeholder="Tambah description"

                {...register("description")}

            />


            {
                errors.title &&
                (
                    <p>
                        {errors.title.message}
                    </p>

                )

            }

            {
                errors.description &&
                (
                    <p>
                        {errors.description.message}
                    </p>

                )

            }



            <button

                type="submit"

            >

                Tambah

            </button>


        </form>

    )

}