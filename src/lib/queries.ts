'use server'

import { Prisma } from "@prisma/client"
import { db } from "./db"
import bcrypt from 'bcrypt'

interface User {
    name: string
    email: string
    password: string
}

export const createUser = async (user: User) => {
    if (user.password === '') return null;
    const password = await bcrypt.hash(user.password, 10);
    user.password = password;
    try {
        const response = await db.user.create({ data: { ...user } })
        return response
    } catch (e: any) {
        if (e instanceof Prisma.PrismaClientKnownRequestError) {
            if (e.code === 'P2002') {
                return {
                    type: 'err',
                    msg: 'This email is already exist'
                }
            }
        }
        throw e
    }
}