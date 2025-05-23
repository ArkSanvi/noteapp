import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import NoteEditor from './components/NoteEditor';
// Simple ID generation function since we're not importing uuid
const generateId = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

function App() {
  // State for notes, folders, and active note
  const [notes, setNotes] = useState([]);
  const [folders, setFolders] = useState([]);
  const [activeNoteId, setActiveNoteId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Load data from localStorage on initial render
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    const savedFolders = localStorage.getItem('folders');
    
    if (savedNotes) setNotes(JSON.parse(savedNotes));
    if (savedFolders) setFolders(JSON.parse(savedFolders));
  }, []);

  // Save data to localStorage whenever notes or folders change
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('folders', JSON.stringify(folders));
  }, [folders]);

  // Create a new note
  const createNote = (folderId = null) => {
    const newNote = {
      id: generateId(),
      title: 'Untitled Note',
      content: '',
      folderId,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };
    
    setNotes([...notes, newNote]);
    setActiveNoteId(newNote.id);
    return newNote;
  };

  // Get the active note
  const getActiveNote = () => {
    return notes.find(note => note.id === activeNoteId) || null;
  };

  // Update a note
  const updateNote = (updatedNote) => {
    const updatedNotes = notes.map(note => 
      note.id === updatedNote.id ? { ...updatedNote, updatedAt: Date.now() } : note
    );
    setNotes(updatedNotes);
  };

  // Delete a note
  const deleteNote = (noteId) => {
    const updatedNotes = notes.filter(note => note.id !== noteId);
    setNotes(updatedNotes);
    
    if (activeNoteId === noteId) {
      setActiveNoteId(updatedNotes.length > 0 ? updatedNotes[0].id : null);
    }
  };

  // Create a new folder
  const createFolder = () => {
    const newFolder = {
      id: generateId(),
      name: 'New Folder',
      createdAt: Date.now()
    };
    
    setFolders([...folders, newFolder]);
    return newFolder;
  };

  // Update a folder
  const updateFolder = (updatedFolder) => {
    const updatedFolders = folders.map(folder => 
      folder.id === updatedFolder.id ? updatedFolder : folder
    );
    setFolders(updatedFolders);
  };

  // Delete a folder
  const deleteFolder = (folderId) => {
    // Delete the folder
    setFolders(folders.filter(folder => folder.id !== folderId));
    
    // Delete all notes within this folder or move them to root
    const updatedNotes = notes.filter(note => note.folderId !== folderId);
    setNotes(updatedNotes);
    
    // Update active note if necessary
    if (activeNoteId && !updatedNotes.find(note => note.id === activeNoteId)) {
      setActiveNoteId(updatedNotes.length > 0 ? updatedNotes[0].id : null);
    }
  };

  // Filter notes based on search query
  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <button 
        className="sidebar-toggle"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? '←' : '→'}
      </button>
      
      <div className={`app-layout ${isSidebarOpen ? '' : 'sidebar-collapsed'}`}>
        {isSidebarOpen && (
          <Sidebar
            notes={filteredNotes}
            folders={folders}
            activeNoteId={activeNoteId}
            setActiveNoteId={setActiveNoteId}
            createNote={createNote}
            createFolder={createFolder}
            updateFolder={updateFolder}
            deleteFolder={deleteFolder}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
        )}
        
        <main className="editor-container">
          {activeNoteId ? (
            <NoteEditor
              note={getActiveNote()}
              updateNote={updateNote}
              deleteNote={deleteNote}
            />
          ) : (
            <div className="empty-state">
              <h2>No Note Selected</h2>
              <p>Select a note from the sidebar or create a new one.</p>
              <button onClick={() => createNote()}>Create New Note</button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;