import { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import SearchField from "./components/search";
import TitleField from "./components/title";
import AddButton from "./components/add-button";
import Note from "./components/note";
import './App.css';

function App() {

  const defaultNoteState = { id: Date.now(), title: '', editor: ''};

  const dataFromLocalStorage = JSON.parse(localStorage.getItem('notes') || 'null');

  const [selectedNote, setSelectedNote] = useState(defaultNoteState);
  const [notesArray, setNotesArray] = useState(dataFromLocalStorage || []);
  const [editedNote, setEditedNote] = useState(null);
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    (() => localStorage.setItem('notes', JSON.stringify(notesArray)))();
  }, [notesArray]);

  const handleEditTitle = (e) => {
    setSelectedNote({...selectedNote, title: e.target.value});
  }

  const handleChangeEditor = (value) => {
    setSelectedNote({...selectedNote, editor: value})
  }

  const handleSearch = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  }

  const handleSave = () => {

    if (!selectedNote.title) {
      alert('Введите название заметки');
      return;
    }

    if (editedNote) {
      const modified = [...notesArray];
      const index = notesArray.findIndex((note) => note.id === editedNote);
      modified.splice(index, 1, selectedNote);
      setNotesArray([...modified]);
    } else {
      setNotesArray([...notesArray, selectedNote]);
    }

    setSelectedNote(defaultNoteState);
    setEditedNote(null);
  }

  const handleDelete = (id, e) => {
    if (e) {
      e.stopPropagation()
    }

    const modified = [...notesArray];
    const index = notesArray.findIndex((note) => note.id === id);
    modified.splice(index, 1);

    if (id === selectedNote.id) {
      setSelectedNote(defaultNoteState);
    }

    setEditedNote(null);
    setNotesArray([...modified]);
  }

  const handleSelect = (id) => {
    setEditedNote(id);
    setSelectedNote(notesArray.find((note) => note.id === id));
  }

  return (
    <section className="App">
      <TitleField
        value={selectedNote.title}
        onChangeTitle={handleEditTitle}
      />
      <SearchField
        value={searchValue}
        onSearch={handleSearch}
      />
      <div className="editor">
        <Editor
          value={selectedNote.editor}
          init={{
            height: 500,
            menubar: false
          }}
          onEditorChange={handleChangeEditor}
        />
        <AddButton onClick={handleSave} />
      </div>
      <div>
        {notesArray.length ? notesArray.filter(({title}) => title.toLowerCase().includes(searchValue)).map(({id, title}) => (
          <Note
            key={id}
            title={title}
            isSelected={id === editedNote}
            onDelete={(e) => handleDelete(id, e)}
            onSelect={() => handleSelect(id)}
          />
        )) : <p>Пока заметок нет...</p>}
      </div>
    </section>
  );
}

export default App;
