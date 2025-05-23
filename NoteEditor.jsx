import React, { useState, useEffect } from 'react';

const NoteEditor = ({ note, updateNote, deleteNote }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  // Update local state when the note prop changes
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [note]);

  // Save changes to the note
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    updateNote({ ...note, title: e.target.value });
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
    updateNote({ ...note, content: e.target.value });
  };

  // Apply formatting to selected text
  const applyFormatting = (format) => {
    const textarea = document.getElementById('note-content');
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    
    let formattedText = '';
    let newCursorPosition = 0;
    
    if (format === 'bold') {
      formattedText = `**${selectedText}**`;
      newCursorPosition = end + 4; // Account for the added formatting characters
    } else if (format === 'italic') {
      formattedText = `*${selectedText}*`;
      newCursorPosition = end + 2;
    }
    
    const newContent = content.substring(0, start) + formattedText + content.substring(end);
    setContent(newContent);
    updateNote({ ...note, content: newContent });
    
    // Reset cursor position after React updates the DOM
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 0);
  };

  if (!note) return null;

  return (
    <div className="note-editor">
      <div className="note-header">
        <input
          type="text"
          className="note-title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Note Title"
        />
        <div className="note-actions">
          <button onClick={() => deleteNote(note.id)} className="delete-note-btn">
            Delete
          </button>
        </div>
      </div>
      
      <div className="formatting-toolbar">
        <button onClick={() => applyFormatting('bold')} className="format-btn">
          B
        </button>
        <button onClick={() => applyFormatting('italic')} className="format-btn">
          I
        </button>
      </div>
      
      <textarea
        id="note-content"
        className="note-content"
        value={content}
        onChange={handleContentChange}
        placeholder="Write your note here..."
      />
      
      <div className="note-footer">
        <span className="last-updated">
          Last updated: {new Date(note.updatedAt).toLocaleString()}
        </span>
      </div>
    </div>
  );
};

export default NoteEditor;