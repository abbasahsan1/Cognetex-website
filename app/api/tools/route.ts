import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';

const COLLECTION_NAME = 'tools';

export const dynamic = 'force-dynamic';

interface Tool {
  id: string;
  order?: number;
}

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const tools = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Tool[];
    tools.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    return NextResponse.json(tools);
  } catch (error) {
    console.error('Failed to fetch tools:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newTool = await request.json();

    const toolsRef = collection(db, COLLECTION_NAME);
    const newDocRef = doc(toolsRef);

    const querySnapshot = await getDocs(toolsRef);
    const count = querySnapshot.size;

    const toolData = {
      ...newTool,
      id: newDocRef.id,
      order: count + 1
    };

    await setDoc(newDocRef, toolData);

    return NextResponse.json(toolData, { status: 201 });
  } catch (error) {
    console.error('Failed to add tool:', error);
    return NextResponse.json({ error: 'Failed to add tool' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedTool = await request.json();

    if (!updatedTool.id) {
      return NextResponse.json({ error: 'Tool ID is required' }, { status: 400 });
    }

    const docRef = doc(db, COLLECTION_NAME, updatedTool.id);
    await updateDoc(docRef, updatedTool);

    const docSnap = await getDoc(docRef);

    return NextResponse.json({ id: docSnap.id, ...docSnap.data() });
  } catch (error) {
    console.error('Failed to update tool:', error);
    return NextResponse.json({ error: 'Failed to update tool' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Tool ID is required' }, { status: 400 });
    }

    await deleteDoc(doc(db, COLLECTION_NAME, id));

    return NextResponse.json({ message: 'Tool deleted successfully' });
  } catch (error) {
    console.error('Failed to delete tool:', error);
    return NextResponse.json({ error: 'Failed to delete tool' }, { status: 500 });
  }
}
