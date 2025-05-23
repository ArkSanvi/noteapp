import React from 'react';

export default function Sidebar({ notes, onSelectNote, onCreateNote }) {
  return (
    <div className="sidebar bg-gray-100 w-64 p-4 h-screen border-r border-gray-200">
      <h2 className="text-xl font-bold mb-4">Notes</h2>
      
      {/* Button to create a new note */}
      <button
        onClick={onCreateNote}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
      >
        New Note
      </button>

      {/* List of notes */}
      <div className="space-y-2">
        {notes.map((note) => (
          <div
            key={note.id}
            onClick={() => onSelectNote(note)}
            className="p-2 hover:bg-gray-200 rounded cursor-pointer"
          >
            {note.title || "Untitled Note"}
          </div>
        ))}
      </div>
    </div>
  );
}
