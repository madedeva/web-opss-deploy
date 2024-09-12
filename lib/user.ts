import { PrismaClient, User } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

/**
 * Finds a user by their email address.
 * @param email The user's email.
 * @returns The user object or null if not found.
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    return await prisma.user.findUnique({
      where: { email },
    });
  } catch (error) {
    console.error('Error finding user by email:', error);
    return null;
  }
}

/**
 * Creates a password reset token for a user.
 * @param userId The user's ID.
 * @returns The password reset token.
 */
export async function createPasswordResetToken(userId: string): Promise<string> {
    const token = uuidv4(); // Generate a unique token
    const expiresAt = new Date(Date.now() + 3600000);
  
    try {
      await prisma.passwordResetToken.create({
        data: {
          userId: parseInt(userId, 10),
          token,
          expiresAt,
        },
      });
  
      return token;
    } catch (error) {
      console.error('Error creating password reset token:', error);
      throw new Error('Unable to create password reset token');
    }
  }

/**
 * Verifies a password reset token.
 * @param token The token string.
 * @returns The user object if the token is valid, otherwise null.
 */
export async function verifyPasswordResetToken(token: string): Promise<User | null> {
  try {
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
      include: { user: true },
    });

    if (!resetToken || resetToken.expiresAt < new Date()) {
      return null;
    }

    return resetToken.user;
  } catch (error) {
    console.error('Error verifying password reset token:', error);
    return null;
  }
}

/**
 * Resets the user's password.
 * @param userId The user's ID.
 * @param newPassword The new password.
 */
export async function resetPassword(userId: string, newPassword: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
  
    try {
      await prisma.user.update({
        where: { id: parseInt(userId, 10) },
        data: { password: hashedPassword },
      });
  
      await prisma.passwordResetToken.deleteMany({
        where: { userId: parseInt(userId, 10) },
      });
    } catch (error) {
      console.error('Error resetting password:', error);
      throw new Error('Unable to reset password');
    }
  }
