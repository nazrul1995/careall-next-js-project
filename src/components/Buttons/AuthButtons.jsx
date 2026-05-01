"use client";
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

const AuthButtons = () => {
    const session = useSession();
    return (
        <>
        {
            session.status==='authenticated' ? (
                <button onClick={() => signOut({ callbackUrl: '/' })}
            className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-zinc-800 rounded-md"
        >
            LogOut
        </button>
            ) : (
                <Link href={"/login"}
            className="w-full text-left px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-zinc-800 rounded-md"
        >
            LogIn
        </Link>
            )
        }
        </>
    );
};

export default AuthButtons;