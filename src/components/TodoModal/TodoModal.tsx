import React from 'react';
import { Loader } from '../Loader';
import { useAppSelector } from '../../app/hooks';
import { useDispatch } from 'react-redux';
import { removeCurrentTodo } from '../../features/currentTodo';

export const TodoModal: React.FC = () => {
  const { user, todo } = useAppSelector(state => state.currentTodo);
  const dispatch = useDispatch();

  return (
    <div className="modal is-active" data-cy="modal">
      <div className="modal-background" />

      {!todo && <Loader />}

      <div className="modal-card">
        <header className="modal-card-head">
          <div
            className="modal-card-title has-text-weight-medium"
            data-cy="modal-header"
          >
            Todo {todo && todo.id}
          </div>

          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            className="delete"
            data-cy="modal-close"
            onClick={() => dispatch(removeCurrentTodo())}
          />
        </header>

        <div className="modal-card-body">
          <p className="block" data-cy="modal-title">
            {todo.title}
          </p>

          <p className="block" data-cy="modal-user">
            {/* For not completed */}
            {!todo.completed && (
              <strong className="has-text-danger">Planned</strong>
            )}

            {/* For completed */}
            {todo.completed && (
              <strong className="has-text-success">Done</strong>
            )}
            {' by '}
            <a href="mailto:Sincere@april.biz">{user.name}</a>
          </p>
        </div>
      </div>
    </div>
  );
};
