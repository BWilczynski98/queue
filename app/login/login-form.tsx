'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import z from "zod";


const loginFormSchema = z.object({
    username: z.string().email({ message: "Niepoprawny adres email" }),
    password: z.string().min(6, { message: "Hasło musi się składać z minimum 6 znaków" }).max(100, { message: "Hasło może się składać maksymalnie z 100 znaków" }),
})

export const LoginForm = () => {
    const form = useForm<z.infer<typeof loginFormSchema>>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            username: "",
            password: "",
        }
    });

    const onSubmit = (data: z.infer<typeof loginFormSchema>) => {
        console.log(data)
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-sm">
                <CardHeader>
                    <CardTitle>Logowanie</CardTitle>
                    <CardDescription>Zaloguj się do swojego konta za pomocą adresu email oraz hasła</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name='username'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Adres email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="nazwa@email.com" {...field} required />
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
                                        <FormLabel>Hasło</FormLabel>
                                        <FormControl>
                                            <Input placeholder="********" {...field} type="password" required />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full cursor-pointer">Zaloguj</Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="justify-center">
                    <p className="text-sm">Nie posiadasz konta? <Link href="registration" className="text-blue-500">Stwórz nowe</Link></p>
                </CardFooter>
            </Card>
        </div>
    )
}