
import { db } from '../lib/firebase';
import { collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, '../data');

async function migrate() {
    try {
        const files = await fs.readdir(DATA_DIR);

        for (const file of files) {
            if (path.extname(file) === '.json') {
                const collectionName = path.basename(file, '.json');
                console.log(`Migrating ${collectionName}...`);

                const filePath = path.join(DATA_DIR, file);
                const data = await fs.readFile(filePath, 'utf-8');
                const jsonData = JSON.parse(data);

                if (Array.isArray(jsonData)) {
                    const batch = writeBatch(db);
                    let count = 0;

                    for (const item of jsonData) {
                        const docRef = doc(collection(db, collectionName), item.id ? item.id.toString() : undefined);
                        batch.set(docRef, item);
                        count++;

                        if (count >= 400) {
                            await batch.commit();
                            console.log(`Committed batch of ${count} items for ${collectionName}`);
                            count = 0;
                        }
                    }

                    if (count > 0) {
                        await batch.commit();
                        console.log(`Committed remaining ${count} items for ${collectionName}`);
                    }
                } else {
                    // Single object (like password.json maybe?)
                    // If it's a single object, we might want to store it as a single doc or multiple docs?
                    // Let's assume it's a single doc in a collection or just skip if not array?
                    // Checking previous file list, most seem to be lists.
                    // password.json was small. Let's handle object as a single doc 'config' or similar?
                    // Or just add it to collection with auto ID?
                    // Let's check if it has an ID.

                    const docRef = doc(collection(db, collectionName), 'main'); // Use 'main' as ID for single objects
                    await setDoc(docRef, jsonData);
                    console.log(`Migrated single object for ${collectionName}`);
                }
            }
        }

        console.log('Migration complete!');
        process.exit(0);
    } catch (error) {
        console.error('Migration failed:', error);
        process.exit(1);
    }
}

migrate();
