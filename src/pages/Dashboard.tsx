import BulkAction from "../components/task/BulkAction";
import TaskCard from "../components/task/TaskCard";
import TaskFilter from "../components/task/TaskFilter";
import TaskForm from "../components/task/TaskForm";
import { useTasks } from "../hooks/useTasks";
import { useAuthStore } from "../store/authStore";
import { useTaskFilterStore } from "../store/taskFilterStore";

export default function Dashboard() {
    const logout = useAuthStore((state) => state.logout);
    const { data, isLoading } = useTasks();
    const { filter, keyword } = useTaskFilterStore();

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center gap-3">
                <svg className="animate-spin h-10 w-10 text-orange-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-sm font-medium text-slate-500 tracking-wide">Memuat data dashboard...</p>
            </div>
        );
    }

    const filteredTasks = data?.filter(task => {
        const matchKeyword = task.title.toLowerCase().includes(keyword.toLowerCase());
        const matchFilter =
            filter === "all" ||
            (filter === "completed" && task.completed) ||
            (filter === "active" && !task.completed);

        return matchKeyword && matchFilter;
    });

    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 relative overflow-hidden">

            <div className="absolute top-0 right-[10%] w-[400px] h-[400px] bg-orange-200/15 rounded-full blur-[120px] pointer-events-none -z-10" />
            <div className="absolute bottom-[10%] left-[5%] w-[500px] h-[500px] bg-slate-200/40 rounded-full blur-[130px] pointer-events-none -z-10" />

            <header className="sticky top-0 z-50 border-b border-slate-200/60 backdrop-blur-md bg-white/75">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-orange-500/20">
                            M
                        </div>
                        <span className="text-xl font-bold text-slate-900 tracking-tight">
                            Manage<span className="text-orange-500">CO</span>
                        </span>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-rose-600 hover:bg-rose-50/80 border border-transparent hover:border-rose-100 transition duration-200 active:scale-[0.98]"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Keluar
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                <div className="mb-8">
                    <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight sm:text-3xl">
                        TaskFlow Dashboard
                    </h1>
                    <p className="text-sm text-slate-500 mt-1">
                        Kelola tugas harian Anda, filter prioritas, dan pantau produktivitas di satu tempat.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-1 bg-white/95 p-6 rounded-2xl border border-slate-200/80 shadow-sm backdrop-blur-sm lg:sticky lg:top-24">
                        <h2 className="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100">
                            Tambah Tugas Baru
                        </h2>
                        <TaskForm />
                    </div>

                    <div className="lg:col-span-2 space-y-5">
                        <div className="bg-white/95 p-4 rounded-2xl border border-slate-200/80 shadow-sm backdrop-blur-sm">
                            <TaskFilter />
                        </div>

                        <BulkAction />

                        <div className="space-y-3">
                            {filteredTasks && filteredTasks.length > 0 ? (
                                filteredTasks.map((task) => (
                                    <TaskCard key={task.id} task={task} />
                                ))
                            ) : (
                                <div className="text-center py-12 bg-white/95 rounded-2xl border border-dashed border-slate-300 p-6 backdrop-blur-sm">
                                    <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                    <h3 className="mt-2 text-sm font-semibold text-slate-900">Tidak ada tugas</h3>
                                    <p className="mt-1 text-xs text-slate-500">Tidak ditemukan tugas yang cocok dengan filter atau kata kunci Anda.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}