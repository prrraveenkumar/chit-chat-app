import { resend } from "@/lib/resend";
import VerificationaEmail from "../../emails/varificationEmail";
import { ApiResponse } from "@/types/apiResponse";


export async  function sendVerificationEmail(
    email: string,
    username: string,
    otp: string
): Promise<ApiResponse>{
    try{
        await resend.emails.send({
            from : 'onboarding@resend.dev',
            to: email,
            subject: "Verify your email address",
            react: VerificationaEmail({ username, otp })
        })
    return{
        success: true,
        message: "Verification email send successfully"
    }
    }catch(emailError){
        console.error("Error sending verification email : ", emailError);
        return {
            success: false,
            message: "Failed to send verification email.",
        };
    }
}
