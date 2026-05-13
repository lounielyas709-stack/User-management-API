import prisma from "../models/prisma.js";
import { hashPassword } from "../utils/password.js";

export const getAllUsers = async () => {

    const userList = await prisma.user.findMany();
    const userCount = await prisma.user.count()
    return{
        data: userList,
        total: userCount
    };
};

export const getUserById = async (id) => {
    const userById= await prisma.user.findUnique(
        {where: {id}}
    );
    return{
        data: userById
    };
};

export const createUser= async (userData) => {
    const hashedPassword = await hashPassword(userData.password);
    const createdUser = await prisma.user.create({
        data: {
            email: userData.email,
            name: userData.name,
            password: hashedPassword
        }
    });
    return {
        data: createdUser
    };
};

export const updateUser = async (id, userData) => {
    const updatedUser = await prisma.user.update({
        where: {id},
        data: {
            ...(userData.email && {email: userData.email}),
            ...(userData.name && {name: userData.name})
        }
    });
    return {
        data: updatedUser
    };
};

export const deleteUser = async (id) => {
    const userById= await prisma.user.findUnique(
        {where: {id}}
    )
    return prisma.user.delete({where: {id}})
    return true;
}; 



