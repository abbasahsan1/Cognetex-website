import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';

const COLLECTION_NAME = 'services';

export const dynamic = 'force-dynamic';

interface Service {
  id: string;
  order?: number;
}

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const services = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Service[];
    services.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    return NextResponse.json(services);
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const newService = await request.json();

    const servicesRef = collection(db, COLLECTION_NAME);
    const newDocRef = doc(servicesRef);

    const querySnapshot = await getDocs(servicesRef);
    const count = querySnapshot.size;

    const serviceData = {
      ...newService,
      id: newDocRef.id,
      order: count
    };

    await setDoc(newDocRef, serviceData);

    return NextResponse.json(serviceData, { status: 201 });
  } catch (error) {
    console.error('Error adding service:', error);
    return NextResponse.json({ error: 'Failed to add service' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedService = await request.json();

    if (!updatedService.id) {
      return NextResponse.json({ error: 'Service ID is required' }, { status: 400 });
    }

    const docRef = doc(db, COLLECTION_NAME, updatedService.id);
    await updateDoc(docRef, updatedService);

    const docSnap = await getDoc(docRef);

    return NextResponse.json({ id: docSnap.id, ...docSnap.data() });
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    await deleteDoc(doc(db, COLLECTION_NAME, id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
