import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { useAppSelector } from './app/hooks';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setTodos } from './features/todos';

export const App = () => {
  const [isLoader, setIsLoader] = useState(false);

  const dispatch = useDispatch();
  const currentTodo = useAppSelector(state => state.currentTodo);

  useEffect(() => {
    setIsLoader(true);
    const fetchTodos = async () => {
      try {
        const todos = await getTodos();

        dispatch(setTodos(todos));
      } catch (error) {
      } finally {
        setIsLoader(false);
      }
    };

    fetchTodos();
  }, []);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">{isLoader ? <Loader /> : <TodoList />}</div>
          </div>
        </div>
      </div>
      {currentTodo && <TodoModal />}
    </>
  );
};
