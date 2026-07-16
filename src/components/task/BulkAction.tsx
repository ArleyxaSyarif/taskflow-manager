import { useBulkDelete } from "../../hooks/useBulkDelete";
import { useSelectionStore } from "../../store/selectionStore";

export default function BulkAction() {
    const { selectedIds, clearSelection } = useSelectionStore();
    const bulkDelete = useBulkDelete();

    if (selectedIds.length === 0) {
        return null;
    }

    const handleDelete = () => {
        if (window.confirm(`Apakah Anda yakin ingin menghapus ${selectedIds.length} tugas ini?`)) {
            bulkDelete.mutate(selectedIds, {
                onSuccess: () => {
                    if (clearSelection) clearSelection();
                },
            });
        }
    };

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
            <div className="flex items-center gap-4 bg-white text-slate-800 px-4 py-3 rounded-full shadow-xl shadow-slate-200/80 border border-slate-200 backdrop-blur-sm bg-opacity-95">

                <div className="flex items-center gap-2 pl-2">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[11px] font-bold text-white ring-2 ring-indigo-600/10">
                        {selectedIds.length}
                    </span>
                    <span className="text-xs font-semibold text-slate-600 tracking-wide whitespace-nowrap">
                        tugas dipilih
                    </span>
                </div>

                <div className="h-4 w-px bg-slate-200" />

                <div className="flex items-center gap-2">
                    {clearSelection && (
                        <button
                            type="button"
                            onClick={clearSelection}
                            disabled={bulkDelete.isPending}
                            className="text-xs font-medium text-slate-500 hover:text-slate-800 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-all disabled:opacity-50"
                        >
                            Batal
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={bulkDelete.isPending}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm hover:shadow-red-600/20"
                    >
                        {bulkDelete.isPending ? (
                            <>
                                <svg className="animate-spin h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                <span>Menghapus...</span>
                            </>
                        ) : (
                            <>
                                <svg className="h-3.5 w-3.5 text-red-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                <span>Hapus Semua</span>
                            </>
                        )}
                    </button>
                </div>

            </div>
        </div>
    );
}