import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";


import { deleteTask } from "../api/taskApi";



export function useDeleteTask(){


    const queryClient =
        useQueryClient();



    return useMutation({


        mutationFn:deleteTask,


        onSuccess:()=>{


            queryClient.invalidateQueries({

                queryKey:["tasks"]

            });


        }


    });


}