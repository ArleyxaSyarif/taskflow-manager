import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTask } from "../api/taskApi";


export function useCreateTask(){
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ title, description }: { title: string; description: string }) => 
            createTask(title, description),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["tasks"]
            });
        }
    });
}
