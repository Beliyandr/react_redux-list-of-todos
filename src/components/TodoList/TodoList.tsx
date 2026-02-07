/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../app/hooks';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { useDispatch } from 'react-redux';
import { addCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const search = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const dispatch = useDispatch();

  const [filteredTodos, setFilteredTodos] = useState<Todo[] | []>([]);

  useEffect(() => {
    const result = filteredTodosByStatus(status);
    setFilteredTodos(result);
  }, [todos, search, status]);

  function filteredTodosByStatus(statusName: string): Todo[] | [] {
    switch (statusName) {
      case 'all':
        return todos.filter(todo => todo.title.includes(search));
      case 'active':
        return todos.filter(
          todo => !todo.completed && todo.title.includes(search),
        );
      case 'completed':
        return todos.filter(
          todo => todo.completed && todo.title.includes(search),
        );
      default:
        return todos.filter(todo => todo.title.includes(search));
    }
  }

  const handleClickTodo = async (userId: number, id: number) => {
    const user = await getUser(userId);
    const todo = todos.find(todo => todo.id === id);

    dispatch(addCurrentTodo({ todo, user }));
  };

  return (
    <>
      {filteredTodos.length === 0 && (
        <p className="notification is-warning">
          There are no todos matching current filter criteria
        </p>
      )}

      <table className="table is-narrow is-fullwidth">
        {filteredTodos.length > 0 && (
          <thead>
            <tr>
              <th>#</th>

              <th>
                <span className="icon">
                  <i className="fas fa-check" />
                </span>
              </th>

              <th>Title</th>
              <th> </th>
            </tr>
          </thead>
        )}

        <tbody>
          {filteredTodos.map(({ id, title, completed, userId }) => (
            <tr
              data-cy="todo"
              key={id}
              className={
                currentTodo?.todo.id === id ? '"has-background-info-light"' : ''
              }
            >
              <td className="is-vcentered">{id}</td>

              <td className="is-vcentered">
                {completed && (
                  <span className="icon" data-cy="iconCompleted">
                    <i className="fas fa-check " />
                  </span>
                )}
              </td>

              <td className="is-vcentered is-expanded">
                <p
                  className={classNames(
                    completed ? 'has-text-success' : 'has-text-danger',
                  )}
                >
                  {title}
                </p>
              </td>

              <td className="has-text-right is-vcentered">
                <button
                  data-cy="selectButton"
                  className="button"
                  type="button"
                  onClick={() => handleClickTodo(userId, id)}
                >
                  <span className="icon">
                    <i
                      className={classNames('far fa-eye', {
                        'fa-eye-slash': currentTodo?.todo.id === id,
                      })}
                    />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
