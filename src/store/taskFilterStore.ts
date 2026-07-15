import { create } from "zustand";


interface TaskFilterState {


    filter:
    "all" |
    "completed" |
    "active";


    keyword:string;



    setFilter:(
        filter:
        "all" |
        "completed" |
        "active"
    )=>void;



    setKeyword:(
        keyword:string
    )=>void;


}



export const useTaskFilterStore =
create<TaskFilterState>((set)=>({


    filter:"all",

    keyword:"",



    setFilter:(filter)=>
        set({
            filter
        }),



    setKeyword:(keyword)=>
        set({
            keyword
        })


}));