"use client";

import { useEffect } from "react";
import Link from "next/link";
// import Header from "@/components/Header"; // Uncomment if you want to use it

export default function Home() {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetch("/api/test");
        const response = await data.json(); // ✅ await this
        console.log("Fetched data:", response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <main>
        {/* <Header /> */}
         <Link href="/contact">Contact</Link>
        <Link href="/register">Register</Link>
         <Link href="/login">Login</Link>
         <Link href="/order">Order</Link>
         <Link href="/about">About</Link>
      </main>
    </div>
  );
}