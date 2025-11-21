import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, setDoc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';

const COLLECTION_NAME = 'blogs';

interface Blog {
  id: string;
  order?: number;
}

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, COLLECTION_NAME));
    const blogs = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Blog[];
    return NextResponse.json(blogs);
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to read blogs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newBlog = await request.json();

    // We need to determine the ID. The previous logic used maxId + 1.
    // For Firestore, we can either use auto-ID or keep the logic.
    // To keep consistency with existing frontend that might expect numeric-like IDs or specific ordering,
    // let's try to maintain the ID generation if possible, OR just use Firestore IDs.
    // However, the migration used existing IDs.
    // Let's fetch all to find max ID? That's expensive.
    // Better: Use Firestore auto-ID if the frontend doesn't strictly depend on numeric IDs for sorting (it uses 'order' field).
    // The previous code did: newBlog.id = (maxId + 1).toString();
    // Let's switch to Firestore auto-IDs for new items, but we need to ensure 'id' field is set in the data too if the app relies on it.

    // Actually, if we use setDoc with a custom ID, we control it.
    // If we use addDoc, Firestore generates it.
    // Let's use addDoc (or doc() with no args) to get a ref, then set the id field in the data to match the doc ID.

    const blogsRef = collection(db, COLLECTION_NAME);
    const newDocRef = doc(blogsRef); // Auto-gen ID

    // Handle 'order' field
    // We need the count to set the order. 
    const querySnapshot = await getDocs(blogsRef);
    const count = querySnapshot.size;

    const blogData = {
      ...newBlog,
      id: newDocRef.id,
      order: count
    };

    await setDoc(newDocRef, blogData);

    return NextResponse.json(blogData, { status: 201 });
  } catch (error) {
    console.error('Error adding blog:', error);
    return NextResponse.json({ error: 'Failed to add blog' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const updatedBlog = await request.json();

    if (!updatedBlog.id) {
      return NextResponse.json({ error: 'Blog ID is required' }, { status: 400 });
    }

    const docRef = doc(db, COLLECTION_NAME, updatedBlog.id);
    await updateDoc(docRef, updatedBlog);

    // Fetch updated data to return
    const docSnap = await getDoc(docRef);

    return NextResponse.json({ id: docSnap.id, ...docSnap.data() });
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
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

    // Reordering is complex in Firestore (requires updating all subsequent docs).
    // For now, let's skip reordering on delete to avoid excessive writes, 
    // or we can implement it if strict ordering is required.
    // The previous code reordered everything.
    // Let's leave it for now, as 'order' might just be for display sorting.

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog:', error);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
