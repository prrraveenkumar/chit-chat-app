import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { messageSchema } from "@/schema/messageSchema";
import FusionAuth from "next-auth/providers/fusionauth";
import { success } from "zod";


export async function POST (request: Request){
    dbConnect()

    try {
        const {username, code} = await request.json()

        const decodedUser = decodeURIComponent(username)

        const user = await UserModel.findOne({username: decodedUser})

        if(!user){
            return Response.json(
                {
                    success: false,
                    message: "User not found"
                },
                {
                    status: 500
                }
            )
        }


        const isCodeValid = user.verifyCode === code 
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date()

        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true
            await user.save()

           return Response.json(
                {
                    success: true,
                    message: "Account is verified successfully"
                },
                {
                    status: 200
                }
            )
        }else if(!isCodeNotExpired){
            return Response.json(
                {
                    success: false,
                    message: "Code is expired please sign up again"
                },
                {
                    status: 400
                }
            )
        }else{
            return Response.json(
                {
                    success: false,
                    message: "Verification code is incorrect"
                },
                {
                    status: 400 
                }
            )
        }

         

         
        
    } catch (error) {
        console.error("Error while verifying code", error)
        return Response.json(
            {
                success: false,
                message: "Erroe while verifying code"
            },
            {
                status: 400
            }

        )
        
    }
}