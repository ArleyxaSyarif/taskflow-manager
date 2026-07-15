import TaskCard from "../components/task/TaskCard";
import TaskFilter from "../components/task/TaskFilter";
import TaskForm from "../components/task/TaskForm";
import { useTasks } from "../hooks/useTasks";
import {
    useTaskFilterStore
} from "../store/taskFilterStore";


export default function Dashboard() {



    const {
        data,
        isLoading
    } = useTasks();

    const {
        filter,
        keyword

    } = useTaskFilterStore();

    if (isLoading) {

        return <h1>Loading...</h1>

    }



    const filteredTasks = data?.filter(task => {


        const matchKeyword =
            task.title
                .toLowerCase()
                .includes(
                    keyword.toLowerCase()
                );



        const matchFilter =

            filter === "all"

            ||

            (
                filter === "completed"
                &&
                task.completed
            )

            ||

            (
                filter === "active"
                &&
                !task.completed
            );



        return (
            matchKeyword &&
            matchFilter
        );


    });

    return (

        <div>

            <h1>
                TaskFlow Dashboard
            </h1>

            <TaskForm />
            <TaskFilter />



            {
                filteredTasks?.map(task => (

                    <TaskCard
                        key={task.id}
                        task={task}
                    />

                ))
            }



        </div>

    )


}