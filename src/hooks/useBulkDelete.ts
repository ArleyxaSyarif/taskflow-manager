import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkDeleteTasks } from "../api/taskApi";
import { useSelectionStore } from "../store/selectionStore";
import toast from "react-hot-toast";

export function useBulkDelete() {

    const queryClient = useQueryClient();

    const clearSelection =
        useSelectionStore(
            state => state.clearSelection
        );

    return useMutation({

        mutationFn: bulkDeleteTasks,

        onSuccess: () => {

            toast.success("Task berhasil dihapus");

            clearSelection();

            queryClient.invalidateQueries({
                queryKey: ["tasks"]
            });

        }

    });

}