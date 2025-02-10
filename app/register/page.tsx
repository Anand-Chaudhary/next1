"use client"

import { useRouter } from 'next/navigation'
import React, {useState} from 'react'

const Register = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(password !== confirmPassword){
            setError("Your password doesnot match")
        }
        try{
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password})
            })

            const data = res.json()
            if(!res.ok){
                setError("Registration Failed")
            }
            router.push("/login")
        }
        catch{

        }
    }

  return (
    <div className='flex justify-center items-center m-20 p-20'>
        <h1 className='text-3xl tracking-tighter underline'>Register</h1>
        <input type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
    </div>
  )
}

export default Register