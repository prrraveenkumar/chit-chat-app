import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { Message } from "@/models/User";


export async function POST(request: Request) {
    await dbConnect()

    const { username, content } = await request.json()

    try {

        const user = await UserModel.findOne({ username })

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User Not fount"
                },
                {
                    status: 404
                }
            )
        }

        if(!user.isAcceptingMessage){
            return Response.json(
                {
                    success: false,
                    message: "User is not accepting messages"
                },
                {
                    status: 403
                 }
            )
        }


        const newMessages = {content, createdAt: new Date()}

        user.message.push(newMessages as Message )

        return Response.json(
                {
                    success: true,
                    message: "Message send Successfully"
                },
                {
                    status: 200 
                }
            )



    } catch (error) {
        console.log("Problem in sending message", error)
        return Response.json(
            {
                success: false,
                message: "Problem in sending message"
            },
            {
                status: 500
            }
        )
    }

}