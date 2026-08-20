"use client"

import React from 'react'
import Link from 'next/link'
import { Lottie } from 'lottie-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-[75vh] flex-col items-center justify-center p-4 text-center">
      <div className="max-w-md w-full flex flex-col items-center gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-72 h-72 sm:w-96 sm:h-96 flex items-center justify-center">
          <Lottie
            src="https://lottie.host/64b947d3-87a1-4ebc-ace4-55c72db05b2e/VYf8bpoZdG.json"
            loop
            autoplay
            className="w-full h-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-foreground">
            Lost in the Adda?
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-sm mx-auto">
            The page you are looking for doesn&apos;t exist, has been moved, or is temporarily unavailable.
          </p>
        </div>

        <Button asChild size="lg" className="px-6 font-medium shadow-xs transition-all duration-200 cursor-pointer">
          <Link href="/">
            Go Back Home
          </Link>
        </Button>
      </div>
    </div>
  )
}
