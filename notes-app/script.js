const addBtn = document.getElementById('add')

const notesL = JSON.parse(localStorage.getItem('notes'))

addBtn.addEventListener('click', () => {
  addNewNote()
})

const addNewNote = (text = '') => {
  const noteEl = document.createElement('div')
  noteEl.classList.add('note')
  noteEl.innerHTML = `
  <div class="notes">
    <div class="tools">
      <button class="edit"><i class="fas fa-edit"></i></button>
      <button class="delete"><i class="fas fa-trash-alt"></i></button>
    </div>
    <div class="main ${text !== '' ? '' : 'hidden'} ">

    </div>
    <textarea class="${text === '' ? '' : 'hidden'}"></textarea>

  </div>
  `
  const editBtn = noteEl.querySelector('.edit')
  const deleteBtn = noteEl.querySelector('.delete')
  const mainEl = noteEl.querySelector('.main')
  const textAreaEl = noteEl.querySelector('textarea')

  if(text){
    textAreaEl.value = text
    mainEl.innerHTML = marked(text)
  }

  editBtn.addEventListener('click', () => {
    mainEl.classList.toggle('hidden');
    textAreaEl.classList.toggle('hidden')
  })

  deleteBtn.addEventListener('click', () => {
    noteEl.remove()
    updateS()
  })

  textAreaEl.addEventListener('input', (e) => {
    const { value } = e.target
    mainEl.innerHTML = marked(value)
    updateS()
  })

  document.body.appendChild(noteEl)
}

if(notesL){
  notesL.forEach(note => {
    addNewNote(note)
  });
}

const updateS = () => {
  const notesText = document.querySelectorAll('textarea');
  const notes = [];
  notesText.forEach(note => {
    notes.push(note.value)
  });

  localStorage.setItem('notes', JSON.stringify(notes))
}