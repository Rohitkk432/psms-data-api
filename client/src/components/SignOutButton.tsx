'use client'

import { signOut } from "next-auth/react"

export function SignOutButton() {
    return (
        <button
            onClick={() => signOut()}
            className="flex items-center gap-2 px-5 py-2.5 
            bg-white/5 backdrop-blur-lg border border-gray-700 
            hover:border-red-500/50 rounded-xl font-medium 
            text-gray-300 hover:text-red-400 
            transition-all duration-200"
        >
            Sign Out
        </button>
    )
} 