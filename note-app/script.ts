interface Note {
    text: string;
    image: string | null;
    id: string;
  }
  
  class NotesApp {
    private notes: Note[] = [];
    private noteTextElement: HTMLTextAreaElement;
    private imageInputElement: HTMLInputElement;
    private saveButtonElement: HTMLButtonElement;
    private notesListElement: HTMLElement;
  
    constructor() {
      this.noteTextElement = document.getElementById('note-text') as HTMLTextAreaElement;
      this.imageInputElement = document.getElementById('image-input') as HTMLInputElement;
      this.saveButtonElement = document.getElementById('save-btn') as HTMLButtonElement;
      this.notesListElement = document.getElementById('notes-list') as HTMLElement;
  
      this.loadNotesFromLocalStorage();
      this.saveButtonElement.addEventListener('click', this.saveNote.bind(this));
      this.renderNotes();
    }
  
    private loadNotesFromLocalStorage() {
      const notesFromStorage = localStorage.getItem('notes');
      if (notesFromStorage) {
        this.notes = JSON.parse(notesFromStorage);
      }
    }
  
    private saveNotesToLocalStorage() {
      localStorage.setItem('notes', JSON.stringify(this.notes));
    }
  
    private renderNotes() {
      this.notesListElement.innerHTML = '';
      this.notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note-item');
        noteElement.innerHTML = `
          <p>${note.text}</p>
          ${note.image ? `<img src="${note.image}" alt="Imagem da Nota" />` : ''}
          <button onclick="deleteNote('${note.id}')">Excluir</button>
        `;
        this.notesListElement.appendChild(noteElement);
      });
    }
  
    public saveNote() {
      const text = this.noteTextElement.value.trim();
      if (text) {
        const image = this.imageInputElement.files ? this.imageInputElement.files[0] : null;
        const imageUrl = image ? URL.createObjectURL(image) : null;
  
        const newNote: Note = {
          text,
          image: imageUrl,
          id: Date.now().toString(),
        };
  
        this.notes.push(newNote);
        this.saveNotesToLocalStorage();
        this.renderNotes();
  
        this.noteTextElement.value = '';
        this.imageInputElement.value = '';
      }
    }
  
    public deleteNote(noteId: string) {
      this.notes = this.notes.filter(note => note.id !== noteId);
      this.saveNotesToLocalStorage();
      this.renderNotes();
    }
  }
  
  const notesApp = new NotesApp();
  
  // Função global para permitir a exclusão de notas a partir do HTML
  function deleteNote(noteId: string) {
    notesApp.deleteNote(noteId);
  }
  