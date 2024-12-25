import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    // Parse request body to get userId
    const { userId } = await req.json();

    // Check if userId is provided
    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Update user's publicMetadata to assign admin role
    await clerkClient.users.updateUser(userId, {
      publicMetadata: { role: 'admin' },
    });

    // Return success message
    return NextResponse.json({ message: 'Admin role assigned successfully' }, { status: 200 });
  } catch (error) {
    // Log error and return a failure response
    console.error('Error assigning admin role:', error);
    return NextResponse.json({ error: 'Failed to assign role' }, { status: 500 });
  }
}
