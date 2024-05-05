"use client"
import Head from "next/head";
import { useState } from "react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export default function Home() {
  
  const [email,setEmail]  = useState<string>("")
  
  const handleSubmit = async () => {
    const response = await fetch('/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email:email})
    });

    if (response.ok) {
      const result = await response.text();
      console.log('Server response:', result);
      alert("Hi sent successfully!");
    } else {
      console.error('Failed to send hi');
      alert("Failed to send hi.");
    }
  }
  
  return (
    <>
      <Head>
        <title>Get a Hi</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            Feeling <span className="text-[hsl(280,100%,70%)]">Lonely</span> ?
          </h1>
          <div className="w-1/2 justify-center items-center flex flex-col ">
          <Input onChangeCapture={e => setEmail(e.currentTarget.value)}
        className="flex-1 w-full mx-4 rounded-md border border-gray-300 px-4 py-2 text-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:focus:border-gray-600 dark:focus:ring-gray-600"
        placeholder="Enter your email"
        type="email"
      />
      <Button onClick={handleSubmit}
        className="inline-flex h-10 w-full items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-900"
        type="submit"
      >
        Get A Hi 👋
      </Button>
          </div>
        </div>
      </main>
    </>
  );
}
