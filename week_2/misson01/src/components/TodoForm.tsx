import { FormEvent, useState } from 'react';
import { useTodo } from '../context/TodoContext';

const TodoForm = (): JSX.Element =>{
    const [input, setInput] = useState<string>('');
    const {addTodo} = useTodo();

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const text = input.trim();

    if(text) {
      //addTodo
      addTodo(text);
      setInput('');
    }
  };

    return (
      <form onSubmit={handleSubmit} 
      className="todo-container__form">
        <input
          value={input}
          onChange={(e): void => setInput(e.target.value)}
          type="text"
          className="todo-container__input"
          placeholder="할 일 입력"
          required
        />
        <button 
        type="submit" 
        className="todo-container__button">
          할 일 추가
        </button>
      </form>
  );
};


export default TodoForm