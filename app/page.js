import navbar from "@/Component/navbar.js";
import ContactHeader from "../Component/contact/Header.js";
import Image from  "next/image";
import Link from  "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main>
      
        <Link href="/register">Register</Link>
         <Link href="/contact">Contact</Link>
      </main>

    </div>
  );
}