import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';

const COLLECTION_NAME = 'links';

interface Link {
  id: string;
  label: string;
  url: string;
  type: string;
  icon: string;
  location: string;
  order: number;
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('location');

    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    let links = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Link[];

    if (location) {
      links = links.filter(link => link.location === location);
    }

    links.sort((a, b) => a.order - b.order);

    return NextResponse.json(links);
  } catch (error) {
    console.error('Error reading links:', error);
    return NextResponse.json({ error: 'Failed to fetch links' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const newLink = await request.json();

    const linksRef = collection(db, COLLECTION_NAME);
    const newDocRef = doc(linksRef);

    // Calculate max ID for order/id consistency if needed, but we use Firestore ID
    // The original code used max ID for ID.
    // We'll use Firestore ID but maybe we should keep numeric ID in data if needed?
    // The interface has id: string.

    const querySnapshot = await getDocs(linksRef);
    const count = querySnapshot.size;

    // For ID, let's use the doc ID.

    const linkData = {
      ...newLink,
      id: newDocRef.id,
      // If order is not provided, append to end
      order: newLink.order ?? count
    };

    await setDoc(newDocRef, linkData);

    return NextResponse.json(linkData, { status: 201 });
  } catch (error) {
    console.error('Error creating link:', error);
    return NextResponse.json({ error: 'Failed to create link' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const updatedLink = await request.json();

    if (!updatedLink.id) {
      return NextResponse.json({ error: 'Link ID required' }, { status: 400 });
    }

    const docRef = doc(db, COLLECTION_NAME, updatedLink.id);
    await updateDoc(docRef, updatedLink);

    // Fetch updated
    const docSnap = await getDoc(docRef);

    return NextResponse.json({ id: docSnap.id, ...docSnap.data() });
  } catch (error) {
    console.error('Error updating link:', error);
    return NextResponse.json({ error: 'Failed to update link' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Link ID required' }, { status: 400 });
    }

    await deleteDoc(doc(db, COLLECTION_NAME, id));

    return NextResponse.json({ message: 'Link deleted successfully' });
  } catch (error) {
    console.error('Error deleting link:', error);
    return NextResponse.json({ error: 'Failed to delete link' }, { status: 500 });
  }
}
