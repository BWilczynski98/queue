'use client'

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";


const registrationFormSchema = z.object({
    username: z.string().email({ message: "Niepoprawny adres email" }),
    password: z.string().min(6, { message: "Hasło musi się składać z minimum 6 znaków" }).max(100, { message: "Hasło może się składać maksymalnie z 100 znaków" }),
    confirm: z.string().min(6, { message: "Hasło musi się składać z minimum 6 znaków" }).max(100, { message: "Hasło może się składać maksymalnie z 100 znaków" }),
}).refine((data) => data.password === data.confirm, {
    message: "Hasła nie są takie same",
    path: ["confirm"],
});

export const RegistrationForm = () => {
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
    const form = useForm<z.infer<typeof registrationFormSchema>>({
        resolver: zodResolver(registrationFormSchema),
        defaultValues: {
            username: "",
            password: "",
            confirm: "",
        }
    });

    const onSubmit = (data: z.infer<typeof registrationFormSchema>) => {
        console.log(data)
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <Card className="w-sm">
                <CardHeader>
                    <CardTitle>Rejestracja</CardTitle>
                    <CardDescription>Zarejestruj konto na wybrany przez siebie adres email</CardDescription>
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
                                            <Input placeholder="********" {...field} type={passwordVisible ? "text" : "password"} required />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="confirm"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Powtórz hasło</FormLabel>
                                        <FormControl>
                                            <Input placeholder="********" {...field} type={passwordVisible ? "text" : "password"} required />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end items-center space-x-2">
                                <Checkbox id="showPassword" className="cursor-pointer" onClick={() => setPasswordVisible(prev => !prev)} />
                                <Label>Pokaż hasła</Label>
                            </div>
                            <Button type="submit" className="w-full cursor-pointer">Zarejestruj</Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="justify-center">
                    <p className="text-sm">Masz już konto? <Link href="login" className="text-blue-500">Zaloguj się</Link></p>
                </CardFooter>
            </Card>
        </div>
    )
}