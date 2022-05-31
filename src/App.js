import './App.css';
import SearchField from "./components/search";
import TitleField from "./components/title";
import AddButton from "./components/add-button";
import Note from "./components/note";
import {useEffect, useState} from "react";
import { Editor } from "@tinymce/tinymce-react";

function App() {


  const dataFromLocalStorage = JSON.parse(localStorage.getItem('notes') || 'null');
  const [noteContent, setNoteContent] = useState({ title: '', editor: ''});

  const [arr, setArr] = useState(dataFromLocalStorage || []);
  const [savedIndex, setSavedIndex] = useState(false);
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => setToLocalStorage(), [arr]);

  const setToLocalStorage = () => localStorage.setItem('notes', JSON.stringify(arr));

  const handleEdit = (e) => {
    setNoteContent({...noteContent, title: e.target.value});
  }

  const handleChangeEditor = (value) => {
    setNoteContent({...noteContent, editor: value})
  }

  const handleSearch = (e) => {
    setSearchValue(e.target.value.toLowerCase());
  }

  const handleSave = () => {
    if (Number.isInteger(savedIndex)) {
      const modified = [...arr];
      modified.splice(savedIndex, 1, noteContent);
      setArr([...modified]);
    } else if (noteContent.title) {
      setArr([...arr, noteContent]);
    }
    console.log('saved ' + arr)
    setNoteContent({ title: '', editor: '' });
    setSavedIndex(false);
  }

  const handleDelete = (index, e) => {
    if (e) e.stopPropagation();
    const modified = [...arr];
    const del = modified.splice(index, 1);
    console.log('deleted ' + del)
    setArr([...modified]);
  }

  const handleSelect = (index) => {
    setSavedIndex(index);
    setNoteContent(arr[index]);
  }

  return (
    <section className="App">
      <TitleField
        value={noteContent.title}
        onChangeTitle={handleEdit}
      />
      <SearchField
        value={searchValue}
        onSearch={handleSearch}
      />
      <div className="editor">
        <Editor
          value={noteContent.editor}
          init={{
            height: 500,
            menubar: false
          }}
          onEditorChange={handleChangeEditor}
        />
        <AddButton onClick={handleSave} />
      </div>
      <div>
        {arr.length ? arr.filter(({title}) => title.toLowerCase().includes(searchValue)).map(({title}, index) => (
          <Note
            key={title}
            title={title}
            isSelected={index === savedIndex}
            onDelete={(e) => handleDelete(index, e)}
            onSelect={() => handleSelect(index)}
          />
        )) : <p>Пока заметок нет...</p>}
      </div>
    </section>
  );
}

export default App;
