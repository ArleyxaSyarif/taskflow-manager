import { useDeleteTask } from "../../hooks/useDeleteTask";
import { useUpdateTask } from "../../hooks/useUpdateTask";
import { useSelectionStore } from "../../store/selectionStore";
import type { Task } from "../../types/task";

interface Props {
    task: Task;
}

export default function TaskCard({ task }: Props) {
    const updateTask = useUpdateTask();
    const deleteTask = useDeleteTask();

    const updateMutation = updateTask as { isPending?: boolean; isLoading?: boolean };
    const deleteMutation = deleteTask as { isPending?: boolean; isLoading?: boolean };
    const isUpdating = updateMutation.isPending || updateMutation.isLoading;
    const isDeleting = deleteMutation.isPending || deleteMutation.isLoading;

    const { selectedIds, toggleSelection } = useSelectionStore();

    const isSelected = selectedIds.includes(task.id);

    return (
        <div
            className={`flex items-center justify-between p-4 bg-white rounded-xl border transition-all duration-200 gap-4 group ${task.completed
                ? "border-slate-100 bg-slate-50/50"
                : "border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-md"
                } ${isDeleting || isUpdating ? "opacity-60 pointer-events-none" : ""}`}
        >
            <div className="flex items-start gap-3.5 flex-1 min-w-0">
                <div className="pt-1 flex items-center justify-center shrink-0">
                    <label className="relative flex items-center justify-center h-5 w-5 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            disabled={isUpdating || isDeleting}
                            onChange={() => {
                                updateTask.mutate({
                                    id: task.id,
                                    completed: !task.completed
                                });
                            }}
                            className="sr-only"
                        />

                        <div
                            className={`h-5 w-5 rounded-lg border flex items-center justify-center transition-all duration-200 ${task.completed
                                ? "bg-orange-500 border-orange-500 shadow-sm"
                                : "bg-white border-slate-300 hover:border-slate-400"
                                } ${isUpdating || isDeleting ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                            {task.completed && (
                                <svg
                                    className="w-3.5 h-3.5 text-white"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={3.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            )}
                        </div>
                    </label>

                </div>

                <div className="flex flex-col min-w-0">
                    <span
                        className={`font-semibold text-sm tracking-tight transition-all truncate ${task.completed
                            ? "line-through text-slate-400"
                            : "text-slate-800"
                            }`}
                    >
                        {task.title}
                    </span>
                    {task.description && (
                        <p
                            className={`text-xs mt-0.5 transition-all line-clamp-2 ${task.completed
                                ? "line-through text-slate-400"
                                : "text-slate-500"
                                }`}
                        >
                            {task.description}
                        </p>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
                <span className={`hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold select-none ${task.completed
                    ? "bg-green-50 text-green-700 border border-green-100"
                    : "bg-orange-50 text-orange-700 border border-orange-100"
                    }`}>
                    {task.completed ? "Selesai" : "Aktif"}
                </span>

                <button
                    onClick={() => {
                        deleteTask.mutate(task.id);
                    }}
                    disabled={isDeleting || isUpdating}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all duration-200 active:scale-95 disabled:cursor-not-allowed"
                    title="Hapus tugas"
                >
                    {isDeleting ? (
                        <svg className="animate-spin h-5 w-5 text-rose-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ) : (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    )}
                </button>

                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelection(task.id)}
                    className="h-4 w-4 accent-orange-500 mt-1"
                />
            </div>
        </div>
    );
}