import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RecipeForm } from "./recipe-form";

export default function FoodPage() {
    return (
        <div className="container mx-auto px-4">
            <header>
                <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-3xl">
                    Stwórz nowy posiłek
                </h1>
            </header>
            <div>
                <Button variant={"link"} asChild>
                    <Link href="/">
                        Wróć do strony głównej
                    </Link>
                </Button>
            </div>
            <div>
                <RecipeForm />
            </div>
        </div>
    )
}