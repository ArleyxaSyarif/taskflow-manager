import { useTaskFilterStore } from "../../store/taskFilterStore";



export default function TaskFilter() {


    const {
        keyword,
        setFilter,
        setKeyword

    } = useTaskFilterStore();



    return (

        <div>


            <input

                className="border p-2"

                placeholder="Cari task..."

                value={keyword}

                onChange={(e) =>
                    setKeyword(e.target.value)
                }

            />



            <button

                onClick={() =>
                    setFilter("all")
                }

            >

                Semua

            </button>



            <button

                onClick={() =>
                    setFilter("completed")
                }

            >

                Selesai

            </button>



            <button

                onClick={() =>
                    setFilter("active")
                }

            >

                Belum Selesai

            </button>



        </div>

    )


}