import {z} from "zod";

export const  messageSchema = z.object({
     content: 
     z
     .string()
     .min(10, {message: "Contain more than 10 character"})
     .max(500, {message: "Must not exceed 500 character"}),

})