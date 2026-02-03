import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { Loader, TodoFilter, TodoList, TodoModal } from './components';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { useAppSelector } from './app/hooks';
import { useDispatch } from 'react-redux';

export const App = () => {
  const dispatch = useDispatch();
  const todos = useAppSelector(state => state.todos);

  return (
    <>
      <div className="section">
        <div className="container">
          <div className="box">
            <h1 className="title">Todos:</h1>

            <div className="block">
              <TodoFilter />
            </div>

            <div className="block">
              {/* <Loader /> */}
              <TodoList />
            </div>
          </div>
        </div>
      </div>

      {/* <TodoModal /> */}
    </>
  );
};
