import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';

function App() {
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState(null);

  // Load notes from localStorage on startup
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) setNotes(JSON.parse(savedNotes));
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Create a new note
  const handleCreateNote = () => {
    const newNote = {
      id: Date.now(), // Unique ID
      title: 'Untitled Note',
      content: '',
    };
    setNotes([...notes, newNote]);
    setActiveNote(newNote);
  };

  // Select a note to edit
  const handleSelectNote = (note) => {
    setActiveNote(note);
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        notes={notes}
        onSelectNote={handleSelectNote}
        onCreateNote={handleCreateNote}
      />
      <div className="flex-1 p-4">
        {activeNote ? (
          <div>
            <h1 className="text-2xl font-bold mb-4">{activeNote.title}</h1>
            <textarea
              value={activeNote.content}
              onChange={(e) => {
                const updatedNote = { ...activeNote, content: e.target.value };
                setActiveNote(updatedNote);
                setNotes(notes.map(note => 
                  note.id === updatedNote.id ? updatedNote : note
                ));
              }}
              className="w-full h-64 p-2 border rounded"
            />
          </div>
        ) : (
          <p>Select or create a note to start editing.</p>
        )}
      </div>
    </div>
  );
}

export default App;
