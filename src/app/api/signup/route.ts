import dBConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt, { compareSync } from "bcryptjs";
import { ApiResponse } from "@/types/apiResponse";
import { signUpSchema } from "@/schema/signUpSchema";
import { success, z } from "zod";
import { sendVerificationEmail } from "@/helpers/sendVarificationEmail";

export async function POST(request : Request){
    await dBConnect();

    try {
        const {username, email, password}= await request.json()
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })

        if(existingUserVerifiedByUsername){
            return Response.json({
                success: false,
                message: "Username is already taken"

            }, {
                status: 400
            })
        }

        const existingUserByEmail = await UserModel.findOne({email})
        const verifyCode = Math.floor(100000 + Math.random()*900000).toString();

        if(existingUserByEmail){
            if(existingUserByEmail.isVerified){
                return Response.json({
                    success: false,
                    message: "User already exist with this email"
                },{
                    status: 400
                })
            }else{
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserByEmail.verifyCode = verifyCode;
                existingUserByEmail.verifyCodeExpiry = new Date (Date.now() + 60*60*1000)
                await existingUserByEmail.save()
            }



        }else{

            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date(); 
            expiryDate.setHours(expiryDate.getHours() + 1)

            const createdUser = new UserModel({
                username,
                email,
                password: hashedPassword,
                verifyCode,
                verifyCodeExpiry: expiryDate,
                isVerified: false,
                isAcceptingMessage: true,
                message: []
            })


            const user = await createdUser.save();

            return Response.json({
                success: true,
                message: "User registered successfully. Please verify your email.",
                user
            })
        }

        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verifyCode

        )

        if(!emailResponse.success){
            return Response.json({
                success: false,
                message: emailResponse.message

            },{status: 500})
        }

        return Response.json({
            success: true,
            message: "User is created successfully. Please verify your email."
           
        },{status: 201})


    } catch (error) {
        console.error("Error registering user: ", error)
        return Response.json({
            success: false,
            message: "Error registering user" 
        })
        
    }
}