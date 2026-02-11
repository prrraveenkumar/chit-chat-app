'use client '
import React, { use, useState } from 'react'
import { useParams, useRouter } from "next/navigation"
import { useForm } from 'react-hook-form'
import { verifySchema } from '@/schema/verifySchema'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'
import { ApiResponse } from '@/types/apiResponse'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

function page() {
    const router = useRouter()
    const params = useParams<{ username: string }>()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const form = useForm<z.infer<typeof verifySchema>>({
        resolver: zodResolver(verifySchema),

    })

    const onSubmit = async (data: z.infer<typeof verifySchema>) => {
        
        setIsSubmitting(true)

        try {
            const response = await axios.post(`/api/verify-code`, { username: params.username, code: data.code })
            toast("success", {
                description: response?.data.message
            })

            router.replace('sign-in ')
        } catch (error) {
            console.error("Error in verify user", error)
            const axiosError = error as AxiosError<ApiResponse>
            let errorMessage = axiosError.response?.data.message
            toast("Verification failed", {
                description: errorMessage,
            })
        }
    }
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100" >
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md" >
                <div className=' text-center'>
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Verify Your Account</h1>
                    <p className='mb-4'>Enter the verification code sent to your email</p>

                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="code"
                            render={
                                ({ field }) => (
                                    <FormItem>
                                        <FormLabel>Verification Code</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter Code" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )
                            } />
                             <Button type="submit" disabled={isSubmitting}>
                            {isSubmitting ? ( <><Loader2 className="animate-spin mr-2 h-4  w-4"  /> Please wait...</>): ('Submit')}
                        </Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default page 