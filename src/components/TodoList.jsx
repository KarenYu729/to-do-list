import React from "react";

const TodoListComponent = ({todos, setTodos, setEditState}) => {
    const handleComplete = (todo) => {
        setTodos(
            todos.map((item) => {
                if (todo.id === item.id) {
                    return {...item, completed: !item.completed}
                }
                return item;
            })
        )
    }
    
    const handleEdit = ({id}) => {
        const getTodoItem = todos.find((todo) => id===todo.id);
        setEditState(getTodoItem);
        // setNewTodo(getTodoItem.title);
        // console.log(getTodoItem)
    }

    const handleDelete = ({id}) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    }

    return (
        <div>
            {
                todos.map((todo) => (
                    <li className={'list-item'} key={todo.id}>

                        <input
                            type={'text'}
                            value={todo.title}
                            className={`list ${todo.completed ? "complete" : ""}`}
                            onChange={(event) => event.preventDefault()}/>

                        <button className={'button-complete task-button'}
                                onClick={() => handleComplete(todo)}>
                            <i className={'fa fa-check-circle'}></i>
                        </button>
                        <button className={'button-edit task-button'}
                                onClick={() => handleEdit(todo)}>
                            <i className={'fa fa-edit'}></i>
                        </button>
                        <button className={'button-delete task-button'}
                                onClick={() => handleDelete(todo)}>
                            <i className={'fa fa-trash'}></i>
                        </button>


                    </li>
                ))
            }
        </div>
    )
}

export default TodoListComponent;