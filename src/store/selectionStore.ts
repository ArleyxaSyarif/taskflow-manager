import { create } from "zustand";

interface SelectionState {

    selectedIds: number[];

    toggleSelection: (id: number) => void;

    clearSelection: () => void;

    selectAll: (ids: number[]) => void;

}

export const useSelectionStore = create<SelectionState>((set) => ({

    selectedIds: [],

    toggleSelection: (id) =>

        set((state) => ({

            selectedIds: state.selectedIds.includes(id)

                ? state.selectedIds.filter(item => item !== id)

                : [...state.selectedIds, id]

        })),

    clearSelection: () =>

        set({

            selectedIds: []

        }),

    selectAll: (ids) =>

        set({

            selectedIds: ids

        })

}));