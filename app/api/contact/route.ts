import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const COLLECTION_NAME = 'contact';
const DOC_ID = 'main'; // Single document for contact info

export async function GET() {
  try {
    const docRef = doc(db, COLLECTION_NAME, DOC_ID);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return NextResponse.json(docSnap.data());
    } else {
      return NextResponse.json({});
    }
  } catch (error) {
    console.error('Error fetching contact info:', error);
    return NextResponse.json({ error: 'Failed to fetch contact info' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedContact = await request.json();
    const docRef = doc(db, COLLECTION_NAME, DOC_ID);

    await setDoc(docRef, updatedContact);

    return NextResponse.json(updatedContact);
  } catch (error) {
    console.error('Error updating contact info:', error);
    return NextResponse.json({ error: 'Failed to update contact info' }, { status: 500 });
  }
}
