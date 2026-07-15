import { z } from "zod";


export const taskSchema = z.object({

    title:z
        .string()
        .min(
            3,
            "Judul minimal 3 karakter"
        ),

    description:z
        .string()
        .min(
            5,
            "Deskripsi minimal 5 karakter"
        )

});


export type TaskFormData =
z.infer<typeof taskSchema>;