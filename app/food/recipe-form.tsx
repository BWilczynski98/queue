'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

const ingredientSchema = z.object({
    value: z.string({
        required_error: "Składnik jest wymagany",
        invalid_type_error: "Składnik musi być typu string",
    })
        .min(2, { message: "Nazwa składnika musi się składać z przynajmniej dwóch znaków" })
        .max(100, { message: "Nazwa składnika może się składać z maksymalnie stu znaków" })
})

const formSchema = z.object({
    name: z.string({
        required_error: "Nazwa jest wymagana",
        invalid_type_error: "Nazwa musi być typu string",
    })
        .min(2, { message: "Nazwa musi się składać z przynajmniej dwóch znaków" })
        .max(100, { message: "Nazwa może się składać z maksymalnie stu znaków" }),
    ingredients: z.array(ingredientSchema),
    description: z.string({ invalid_type_error: "Opis musi być typu string" }).optional(),
})

export function RecipeForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: '',
            ingredients: [{ value: "" }],
            description: ""
        }
    });

    const { fields, append } = useFieldArray({ control: form.control, name: "ingredients" })

    const onSubmit = (data: z.infer<typeof formSchema>) => console.log(data);

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name='name'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nazwa</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nazwa przepisu" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="space-y-6">
                        {fields.map((field, index) => (
                            <div key={field.id} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    key={field.id}
                                    name={`ingredients.${index}.value`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Składnik {index + 1}</FormLabel>
                                            <FormControl>
                                                <Input {...form.register(`ingredients.${index}.value`)} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        ))}
                        <div>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => append({ value: "" })}>
                                <Plus /> Dodaj składnik
                            </Button>
                        </div>
                    </div>
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Instrukcja (opcjonalnie)</FormLabel>
                                <FormControl>
                                    <Textarea
                                        
                                        placeholder="Opisz w krokach przygotowanie potrawy"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-end">
                        <Button type="submit">Zapisz</Button>
                    </div>
                </form>
            </Form>
        </div>


    )
}