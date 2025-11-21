import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';

const COLLECTION_NAME = 'team';

export const dynamic = 'force-dynamic';

interface TeamMember {
  id: string;
  order?: number;
}

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const team = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as TeamMember[];
    team.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    return NextResponse.json(team);
  } catch (error) {
    console.error('Error fetching team:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const newMember = await request.json();

    const teamRef = collection(db, COLLECTION_NAME);
    const newDocRef = doc(teamRef);

    const querySnapshot = await getDocs(teamRef);
    const count = querySnapshot.size;

    const memberData = {
      ...newMember,
      id: newDocRef.id,
      order: count
    };

    await setDoc(newDocRef, memberData);

    return NextResponse.json(memberData, { status: 201 });
  } catch (error) {
    console.error('Error creating team member:', error);
    return NextResponse.json({ error: 'Failed to create team member' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedMember = await request.json();

    if (!updatedMember.id) {
      return NextResponse.json({ error: 'Team member ID is required' }, { status: 400 });
    }

    const docRef = doc(db, COLLECTION_NAME, updatedMember.id);
    await updateDoc(docRef, updatedMember);

    const docSnap = await getDoc(docRef);

    return NextResponse.json({ id: docSnap.id, ...docSnap.data() });
  } catch (error) {
    console.error('Error updating team member:', error);
    return NextResponse.json({ error: 'Failed to update team member' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await deleteDoc(doc(db, COLLECTION_NAME, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting team member:', error);
    return NextResponse.json({ error: 'Failed to delete team member' }, { status: 500 });
  }
}
