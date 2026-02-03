import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { User } from "next-auth";

export async function Post(request: Request) {
    await dbConnect()
    const session = await getServerSession(authOptions)

    const user: User = session?.user as User

    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "User is not authenticated"
            }, {
            status: 401
        })
    }

    const userId = user._id

    const { acceptingMessage } = await request.json()

    try {

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAccetingMessage: acceptingMessage },
            { new: true }
        )

        if (!updatedUser) {
            return Response.json(
                {
                    success: false,
                    message: "Faile to update user status to accept messages"
                }, {
                status: 401
            })
        }

        return Response.json(
            {
                success: true,
                message: "Succesfully Updated updated user",
                updatedUser
            },

            { status: 500 }
        )

    } catch (error) {
        console.log("Faile to update user status to accept messages")
        return Response.json(
            {
                success: false,
                message: "Faile to update user status to accept messages"
            }, {
            status: 500
        })
    }
}



export async function Get(request: Request) {
    await dbConnect()

    const session = await getServerSession(authOptions)

    const user: User = session?.user as User

    if (!session || !session.user) {
        return Response.json(
            {
                success: false,
                message: "User is not authenticated"
            }, {
            status: 401
        })
    }

    const userId = user._id

    try {

        const findedUser = await UserModel.findById(userId)

        if (!findedUser) {
            return Response.json(
                {
                    success: false,
                    message: "User is not found"
                }, {
                status: 400
            })
        }

        return Response.json(
            {
                success: true,
                isAcceptingMessage: findedUser.isAcceptingMessage
            }, {
            status: 200
        })
 
    } catch (error) {
        console.log("Problem in finding User")
        return Response.json(
            {
                success: false,
                message: "Problem in finding User"
            }, {
            status: 500
        })
    }
}