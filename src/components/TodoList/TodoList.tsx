/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { getUser } from '../../api';
import { addCurrentTodo } from '../../features/currentTodo';

export const TodoList: React.FC = () => {
  const todos = useAppSelector(state => state.todos);
  const search = useAppSelector(state => state.filter.query);
  const status = useAppSelector(state => state.filter.status);
  const currentTodo = useAppSelector(state => state.currentTodo);

  const [isLoader, setIsLoader] = useState(true);

  const dispatch = useAppDispatch();

  const [filteredTodos, setFilteredTodos] = useState<Todo[] | []>([]);

  useEffect(() => {
    setIsLoader(false);

    const result = filteredTodosByStatus(status);
    setFilteredTodos(result);
    setIsLoader(true);
  }, [todos, search, status]);

  function filteredTodosByStatus(statusName: string): Todo[] | [] {
    switch (statusName) {
      case 'all':
        return todos.filter(todo =>
          todo.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
        );
      case 'active':
        return todos.filter(
          todo =>
            !todo.completed &&
            todo.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
        );
      case 'completed':
        return todos.filter(
          todo =>
            todo.completed &&
            todo.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
        );
      default:
        return todos.filter(todo =>
          todo.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
        );
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
          {isLoader &&
            filteredTodos.map(({ id, title, completed, userId }) => (
              <tr
                data-cy="todo"
                key={id}
                className={
                  currentTodo?.todo.id === id ? 'has-background-info-light' : ''
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
