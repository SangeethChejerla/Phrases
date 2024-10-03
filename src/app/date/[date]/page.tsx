'use client';

import HeatMapComponent from '@/components/HMap';
import { useAuth } from '@clerk/nextjs';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaEdit, FaSave, FaSpinner, FaTimes, FaTrash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function DatePage({ params }: { params: { date: string } }) {
  const [note, setNote] = useState('');
  interface Note {
    id: string;
    phrase: string;
  }

  const [existingNotes, setExistingNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingPhrase, setEditingPhrase] = useState<string>('');
  const router = useRouter();
  const { isSignedIn, userId } = useAuth();

  useEffect(() => {
    if (!isSignedIn) {
      router.push('/sign-in');
      return;
    }

    // Fetch existing notes for the selected date
    const fetchNotes = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`/api/phrases?date=${params.date}`);
        if (!response.ok) {
          throw new Error('Failed to fetch notes');
        }
        const data = await response.json();
        setExistingNotes(data);
      } catch (error) {
        toast.error('Error fetching notes.');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotes();
  }, [isSignedIn, params.date, router]);

  const handleSave = async () => {
    if (!note.trim()) return;
    setIsSaving(true);
    try {
      const response = await fetch('/api/phrases', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: params.date,
          phrase: note,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save note');
      }

      toast.success('Note saved!');
      setNote('');
      // Auto-refresh the notes list
      const updatedResponse = await fetch(`/api/phrases?date=${params.date}`);
      const updatedData = await updatedResponse.json();
      setExistingNotes(updatedData);
    } catch (error) {
      toast.error('Error saving note.');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this note?')) return;

    try {
      const response = await fetch('/api/phrases', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete note');
      }

      toast.success('Note deleted!');
      // Remove the deleted note from the state
      setExistingNotes(existingNotes.filter((note) => note.id !== id));
    } catch (error) {
      toast.error('Error deleting note.');
      console.error(error);
    }
  };

  const handleEdit = (id: string, currentPhrase: string) => {
    setEditingNoteId(id);
    setEditingPhrase(currentPhrase);
  };

  const handleUpdate = async (id: string) => {
    if (!editingPhrase.trim()) return;

    try {
      const response = await fetch('/api/phrases', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, phrase: editingPhrase }),
      });

      if (!response.ok) {
        throw new Error('Failed to update note');
      }

      toast.success('Note updated!');
      // Update the note in the state
      setExistingNotes(
        existingNotes.map((note) =>
          note.id === id ? { ...note, phrase: editingPhrase } : note
        )
      );
      setEditingNoteId(null);
      setEditingPhrase('');
    } catch (error) {
      toast.error('Error updating note.');
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setEditingNoteId(null);
    setEditingPhrase('');
  };

  return (
    <>
      <div className="flex flex-col items-center h-full  p-6">
        <HeatMapComponent />
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-indigo-600 p-4">
        <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
          <ToastContainer />
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-800">
              Notes for {format(new Date(params.date), 'PPP')}
            </h2>
          </div>
          <div className="mb-6">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Write your note here..."
              rows={4}
            />
            <button
              onClick={handleSave}
              className={`mt-3 w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center ${
                isSaving ? 'cursor-not-allowed opacity-50' : ''
              }`}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                'Save Note'
              )}
            </button>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              Existing Notes
            </h3>
            {isLoading ? (
              <div className="flex justify-center items-center">
                <FaSpinner className="animate-spin text-purple-600 h-8 w-8" />
              </div>
            ) : existingNotes.length > 0 ? (
              <ul className="space-y-4">
                {existingNotes.map((noteItem) => (
                  <li
                    key={noteItem.id}
                    className="border-b pb-4 flex items-start justify-between"
                  >
                    {editingNoteId === noteItem.id ? (
                      <div className="w-full">
                        <input
                          type="text"
                          value={editingPhrase}
                          onChange={(e) => setEditingPhrase(e.target.value)}
                          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <div className="mt-2 flex space-x-2">
                          <button
                            onClick={() => handleUpdate(noteItem.id)}
                            className="flex items-center bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors"
                          >
                            <FaSave className="mr-1" /> Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="flex items-center bg-gray-300 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-400 transition-colors"
                          >
                            <FaTimes className="mr-1" /> Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className="text-gray-800">{noteItem.phrase}</p>
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              handleEdit(noteItem.id, noteItem.phrase)
                            }
                            className="text-blue-500 hover:text-blue-700 transition-colors"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDelete(noteItem.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No notes found for this date.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
