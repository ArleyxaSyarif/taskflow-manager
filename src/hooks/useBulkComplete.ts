
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkCompleteTasks } from "../api/taskApi";
import { useSelectionStore } from "../store/selectionStore";
import toast from "react-hot-toast";

export function useBulkComplete() {

    const queryClient = useQueryClient();

    const clearSelection = useSelectionStore(
        state => state.clearSelection
    );

    return useMutation({

        mutationFn: bulkCompleteTasks,

        onSuccess: () => {

            toast.success("Task berhasil diselesaikan");

            clearSelection();

            queryClient.invalidateQueries({
                queryKey: ["tasks"]
            });

        }

    });

}