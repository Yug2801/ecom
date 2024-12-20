import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/nextjs/server';

export async function POST(req: Request) {
  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Use clerkClient() instead of the deprecated singleton
    await clerkClient().users.updateUser(userId, {
      publicMetadata: { role: 'admin' },
    });

    return NextResponse.json({ message: 'Admin role assigned successfully' });
  } catch (error) {
    console.error('Error assigning admin role:', error);
    return NextResponse.json({ error: 'Failed to assign role' }, { status: 500 });
  }
}
