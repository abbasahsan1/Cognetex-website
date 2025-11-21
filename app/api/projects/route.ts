import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';

const COLLECTION_NAME = 'projects';

export const dynamic = 'force-dynamic';

interface Project {
  id: string;
  order?: number;
}

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const projects = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Project[];
    // Sort by order
    projects.sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json([], { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const newProject = await request.json();

    const projectsRef = collection(db, COLLECTION_NAME);
    const newDocRef = doc(projectsRef);

    const querySnapshot = await getDocs(projectsRef);
    const count = querySnapshot.size;

    const projectData = {
      ...newProject,
      id: newDocRef.id,
      order: count
    };

    await setDoc(newDocRef, projectData);

    return NextResponse.json(projectData, { status: 201 });
  } catch (error) {
    console.error('Error adding project:', error);
    return NextResponse.json({ error: 'Failed to add project' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedProject = await request.json();

    if (!updatedProject.id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    const docRef = doc(db, COLLECTION_NAME, updatedProject.id);
    await updateDoc(docRef, updatedProject);

    const docSnap = await getDoc(docRef);

    return NextResponse.json({ id: docSnap.id, ...docSnap.data() });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
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
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
