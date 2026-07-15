import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { taskSchema, type TaskFormData } from "../../schemas/taskSchema";
import { useCreateTask } from "../../hooks/useCreateTask";

export default function TaskForm() {
    const createTask = useCreateTask();

    const mutation = createTask as { isPending?: boolean; isLoading?: boolean };
    const isPending = mutation.isPending || mutation.isLoading;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<TaskFormData>({
        resolver: zodResolver(taskSchema)
    });

    function onSubmit(data: TaskFormData) {
        createTask.mutate({
            title: data.title,
            description: data.description
        });
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                    Judul Tugas
                </label>
                <input
                    type="text"
                    disabled={isPending}
                    className={`w-full px-3.5 py-2.5 border rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all text-sm ${errors.title
                        ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/15"
                        : "border-slate-200 focus:border-orange-500"
                        }`}
                    placeholder="Contoh: Desain Landing Page"
                    {...register("title")}
                />
                {errors.title && (
                    <p className="text-rose-500 text-xs mt-1.5 flex items-center gap-1.5 font-medium">
                        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        {errors.title.message}
                    </p>
                )}
            </div>

            <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                    Deskripsi
                </label>
                <input
                    type="text"
                    disabled={isPending}
                    className={`w-full px-3.5 py-2.5 border rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/20 transition-all text-sm ${errors.description
                        ? "border-rose-300 focus:border-rose-500 focus:ring-rose-500/15"
                        : "border-slate-200 focus:border-orange-500"
                        }`}
                    placeholder="Tulis detail singkat tugas..."
                    {...register("description")}
                />
                {errors.description && (
                    <p className="text-rose-500 text-xs mt-1.5 flex items-center gap-1.5 font-medium">
                        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        {errors.description.message}
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={isPending}
                className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white transition-all active:scale-[0.98] mt-2 shadow-sm ${isPending
                    ? "bg-orange-400 cursor-not-allowed"
                    : "bg-orange-500 hover:bg-orange-600 shadow-orange-500/10 hover:shadow-md"
                    }`}
            >
                {isPending ? (
                    <>
                        <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Menyimpan...
                    </>
                ) : (
                    <>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                        Tambah Tugas
                    </>
                )}
            </button>
        </form>
    );
}