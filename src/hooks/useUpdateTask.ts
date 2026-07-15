import {
    useMutation,
    useQueryClient
} from "@tanstack/react-query";


import { updateTask } from "../api/taskApi";



export function useUpdateTask(){


    const queryClient =
        useQueryClient();



    return useMutation({

        mutationFn: ({ id, completed }: { id: number; completed: boolean }) => 
                   updateTask(id, completed),

        onSuccess:()=>{


            queryClient.invalidateQueries({

                queryKey:["tasks"]

            });


        }


    });


}