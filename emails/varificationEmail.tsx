import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
} from "@react-email/components";


interface VerificationEmailProps {
    username: string;
    otp: string
}


export default function VerificationaEmail({username, otp}: VerificationEmailProps){
    return(
        <Html>
            <Head>
                <Font
                    fontFamily="Roboto"
                    fallbackFontFamily="Arial"
                    webFont={{
                        url: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap",
                        format: "woff2"
                    }}
                    fontWeight={400}
                />
            </Head>
            <Preview>Your Verification Code</Preview>
            <Section style={{backgroundColor: "#f9f9f9", padding: "20px"}}>
                <Row>
                    <Heading style={{fontFamily: "Roboto, Arial, sans-serif", color: "#333333"}}>
                        Verify Your Email Address
                    </Heading>
                </Row>
                <Row>
                    <Text style={{fontFamily: "Roboto, Arial, sans-serif", color: "#555555", fontSize: "16px"}}>
                        Hi {username},
                    </Text>
                </Row>
                <Row>
                    <Text style={{fontFamily: "Roboto, Arial, sans-serif", color: "#555555", fontSize: "16px"}}>
                        Thank you for signing up! Please use the verification code below to verify your email address:
                    </Text>
                </Row>
                <Row>
                    <Heading style={{fontFamily: "Roboto, Arial, sans-serif", color: "#333333", fontSize: "24px", margin: "20px 0"}}>
                        {otp}
                    </Heading>
                </Row>
                <Row>
                    <Text style={{fontFamily: "Roboto, Arial, sans-serif", color: "#555555", fontSize: "16px"}}>
                        If you did not sign up for this account, please ignore this email.
                    </Text>
                </Row>
                <Row>
                    <Text style={{fontFamily: "Roboto, Arial, sans-serif", color: "#555555", fontSize: "16px"}}>
                        Best regards,<br/>The Chat App Team
                    </Text>
                </Row>
            </Section>
        </Html>
    )
}