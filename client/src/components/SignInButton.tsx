'use client'

import { signIn } from "next-auth/react"
import Image from "next/image"

export function SignInButton() {
    return (
        <button
            onClick={() => signIn('google')}
            className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-lg 
            border border-gray-700 hover:border-blue-500/50 
            rounded-2xl font-medium transition-all duration-200 
            shadow-lg hover:shadow-blue-500/20 group"
        >
            <div className="bg-white p-1.5 rounded-lg group-hover:bg-gray-100 transition-colors">
                <Image
                    src="https://authjs.dev/img/providers/google.svg"
                    alt="Google logo"
                    width={20}
                    height={20}
                />
            </div>
            <span className="text-gray-200 group-hover:text-white transition-colors">
                Sign in with Google
            </span>
        </button>
    )
} 