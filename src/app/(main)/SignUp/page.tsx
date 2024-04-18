"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { createUser } from "@/lib/queries"
import toast from "react-hot-toast"


const FormSchema = z.object({
    firstname: z.string().min(3, {
        message: "First Name must be at least 3 characters.",
    }),
    lastname: z.string().min(3, {
        message: "Last Name must be at least 3 characters.",
    }),
    email: z.string().min(3, {
        message: "Email must be at least 3 characters.",
    }),
    password: z.string().min(8, {
        message: "Email must be at least 8 characters.",
    }),
})

const SignUp = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            password: ""
        },
    })

    async function onSubmit(data: z.infer<typeof FormSchema>) {
        const { firstname, lastname, email, password } = data

        const newUser = {
            name: firstname + ' ' + lastname,
            email: email,
            password: password
        }

        const response: any = await createUser(newUser)

        if(response.type === 'err') {
            return toast.error(response.msg)
        } else {
            toast.success('account created')
        }


    }

    return (
        <div className="h-screen flex w-full justify-center items-center">
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl text-center pb-3">Sign Up</CardTitle>
                    <CardDescription>
                        Enter your information to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                            <FormField
                                control={form.control}
                                name="firstname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="First Name" {...field} required />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="lastname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Last Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Last Name" {...field} required />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="user@gmail.com" type="email" {...field} required />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="...." type="password" {...field} required />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full">
                                Create an account
                            </Button>
                            <div className="mt-4 text-center text-sm">
                                Already have an account?{" "}
                                <Link href="/SignIn" className="underline">
                                    Sign in
                                </Link>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}


export default SignUp