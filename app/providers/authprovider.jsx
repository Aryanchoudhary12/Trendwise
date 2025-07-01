"use client"
import { SessionProvider } from 'next-auth/react'
function AuthProviders({ children }) {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>  
  )
}

export default AuthProviders