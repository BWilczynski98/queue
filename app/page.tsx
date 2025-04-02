import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="space-x-4">
      <Button asChild>
        <Link href="login">Logowanie</Link>
      </Button>
      <Button asChild>
        <Link href="registration">Rejestracja</Link>
      </Button>
    </div>
  )
}