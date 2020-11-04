const formEl = document.getElementById('form')
const inputEl = document.getElementById('input')
const todosEl = document.getElementById('todos')

const updateLS = () => {
  const todosLiEl = document.querySelectorAll('li')

  const todos = []

  todosLiEl.forEach(todoItemEl => {
    todos.push({
      text: todoItemEl.innerText,
      completed: todoItemEl.classList.contains('completed')
    })
  })

  localStorage.setItem('todos', JSON.stringify(todos))
}

const addTodo = (todo = null) => {
  let todoText = inputEl.value

  if (todo) {
    todoText = todo.text
  }

  if (todoText) {
    const todoEl = document.createElement('li')
    todoEl.innerHTML = todoText
    if (todo) {
      if (todo.completed) {
        todoEl.classList.add('completed')
      }
    }

    todoEl.addEventListener('click', () => {
      todoEl.classList.toggle('completed')
      updateLS()
    })

    todoEl.addEventListener('contextmenu', (e) => {
      e.preventDefault()
      todoEl.remove()
      updateLS()
    })

    todosEl.appendChild(todoEl)

    inputEl.value = ''
    updateLS()
  }
}

const todos = JSON.parse(localStorage.getItem('todos'))
if (todos) {
  todos.forEach(todo => {
    addTodo(todo)
  });
}

formEl.addEventListener('submit', (e) => {
  e.preventDefault()

  addTodo()
})