"use server";

import connectToDatabase from "../mongoose";
import User, { IUser } from "../models/users.model";

export async function createUser(user: IUser) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);

    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    throw error;
  }
}
