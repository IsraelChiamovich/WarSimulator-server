// src/services/userService.ts

import { RegisterDTO } from "../DTO/userDTO";
import Organization from "../models/organizationModel";
import User, { IUser } from "../models/userModel";

export const registerUserService = async (userData: RegisterDTO): Promise<IUser> => {
    const existingUser = await User.findOne({ username: userData.username });
    if (existingUser) {
        throw new Error("User already exists");
    }

    if (userData.region) {
        const org = await Organization.findOne({ name: `${userData.organization}-${userData.region}` });
    }

    else {
        const org = await Organization.findOne({ name: userData.organization });
    }
    
    if (!org) {
        throw new Error("Organization not found");
    }

    const userMissiles = org.resources.map(resource => ({
        name: resource.name,
        amount: resource.amount
    }))
    const userBudget = org.budget;

    return await User.create({
        username: userData.username,
        password: userData.password,
        organization: userData.organization,
        region: userData.region,
        userMissiles,
        userBudget
    });
};
