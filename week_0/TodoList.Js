// 1. HTML 요소 선택
const todoInput = document.getElementById('todo-input');
const todoForm = document.getElementById('todo-form');
const todoList = document.getElementById('todo-list');
const doneList = document.getElementById('done-list');

// 2. 할 일 목록 상태 변수
let todos = []; // ✅ 빈 배열로 초기화
let doneTasks = [];

// 할 일 목록 렌더링 함수
const renderTasks = () => {
  todoList.innerHTML = '';
  doneList.innerHTML = '';

  todos.forEach((todo) => {
    const li = createTodoElement(todo, false);
    todoList.appendChild(li);
  });

  doneTasks.forEach((todo) => {
    const li = createTodoElement(todo, true);
    doneList.appendChild(li);
  });
};

// 3. 할 일 텍스트 입력 처리 함수
const getTodoText = () => {
  return todoInput.value.trim();
};

// 4. 할 일 추가 처리 함수
const addTodo = (text) => {
  todos.push({ id: Date.now(), text });
  renderTasks();  // ✅ 변경 후 바로 렌더링
  todoInput.value = ''; // ✅ 입력 필드 초기화
};

// 5. 할 일 상태 변경 (완료로 이동)
const completeTodo = (todo) => {
  todos = todos.filter((t) => t.id !== todo.id);
  doneTasks.push(todo);
  renderTasks();
};

// 6. 완료된 할 일 삭제 함수
const deleteTodo = (todo) => {
  doneTasks = doneTasks.filter((t) => t.id !== todo.id);
  renderTasks();
};

// 7. 할 일 아이템 생성 함수
const createTodoElement = (todo, isDone) => {
  const li = document.createElement('li');
  li.classList.add('render-container__item');
  li.textContent = todo.text;

  const button = document.createElement('button');
  button.classList.add('render-container__item-button'); 

  if (isDone) {
    button.textContent = '삭제';
    button.style.backgroundColor = '#D9E2FF';
  } else {
    button.textContent = '완료';
    button.style.backgroundColor = '#D9E2FF';
  }

  button.addEventListener('click', () => {
    if (isDone) {
      deleteTodo(todo);
    } else {
      completeTodo(todo);
    }
  });

  li.appendChild(button);
  return li; // ✅ li 반환 추가
};

// 8. 폼 제출 이벤트 리스너
todoForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = getTodoText();
  if (!text) return; // ✅ 빈 입력 방지
  addTodo(text);
});

// 초기 렌더링
renderTasks();
