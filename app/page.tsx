import Image from "next/image"
import { Header } from "@/components/header"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 relative">
        <Image
          src="/lab-image.jpg"
          alt="Laboratory workspace with test tubes and equipment"
          fill
          priority
          className="object-cover"
        />
      </div>
    </main>
  )
}
