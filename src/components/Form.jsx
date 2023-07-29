import React from "react";
import '../App.css'
import {v4 as uuidV4} from 'uuid'
import {useEffect} from "react";

const FormComponent = ({newTodo, setNewTodo, todos, setTodos, editState, setEditState}) => {
    const updateTodo = (title, id, completed) => {
        // map function
        // https://legacy.reactjs.org/docs/lists-and-keys.html
        // const numbers = [1, 2, 3, 4, 5];
        // const doubled = numbers.map((number) => number * 2);
        // console.log(doubled);
        // [2, 4, 6, 8, 10]
        // Perform operations on each record in the list
        // todos: TodoList info, (title: todoRecord name, id: todoID used for keys, completed: complete check, add/remove class)
        // define: const [todos, setTodos] = useState([]) in App.js
        // if there is a todoRecord which its id = update id, update this record, else keep this record
        // new_Todo is the new list of all todoRecords, we have to update all records in the list instead of the specific record

        // if title, id, completed, will keep the complete state of the record, but if it has already complete, no need to edit it
        // thus, when edit a record, set to complete state to false
        const new_Todo = todos.map((todo)=>
          todo.id === id ? {title, id} : todo
        );
        // console.log(new_Todo);
        // render the new list of all todoRecords to the components
        setTodos(new_Todo);
        // reset editState, update button state (innerhtml=add)
        setEditState('');
    }

    // side effect
    // useEffect is a React Hook that lets you synchronize a component with an external system.
    // https://react.dev/reference/react/useEffect
    // https://www.w3schools.com/react/react_useeffect.asp
    // https://daveceddia.com/useeffect-hook-examples/
    // If you want your effects to run less often, you can provide a second argument – an array of values.
    // Think of them as the dependencies for that effect. If one of the dependencies has changed since the last time,
    // the effect will run again. (It will also still run after the initial render)

    // const [value, setValue] = useState('initial');
    //
    // useEffect(() => {
    //   // This effect uses the `value` variable,
    //   // so it "depends on" `value`.
    //   console.log(value);
    // }, [value])  // pass `value` as a dependency
    // run only when editState change (or, it will keep rendering)
    useEffect(() => {
        if (editState) {
            setNewTodo(editState.title);
        } else {
            setNewTodo('');
        }
    }, [setNewTodo, editState]);

    // if press on button add, get value as a new record of todoRecord
    const onInputChange = (event) => {
        setNewTodo(event.target.value);
    };


    const onSubmit = (event) => {
        // The preventDefault() method cancels the event if it is cancelable, meaning that the default action that belongs
        // to the event will not occur.
        //
        // For example, this can be useful when:
        //
        // Clicking on a "Submit" button, prevent it from submitting a form
        // Clicking on a link, prevent the link from following the URL
        // button type = submit, but do not do that
        event.preventDefault();
        // if add new todoRecord
        if (!editState) {
            // render new todoRecord to the todoRecords list
            // https://www.geeksforgeeks.org/how-to-get-previous-state-in-reactjs-functional-component/
            // https://stackoverflow.com/questions/65733906/react-how-to-use-setstate-inside-functional-component
            // const App = () => {
            //   const [state, setState] = React.useState({ first: "hello", second: "world" });
            //
            //   return (
            //     <div>
            //       <input type="text" value={state.first} onChange={(ev) => setState({...state, first: ev.target.value})} />
            //       <input type="text" value={state.second} onChange={(ev) => setState({...state, second: ev.target.value})} />
            //     </div>
            //   )
            // }
            setTodos([...todos, {id: uuidV4(), title: newTodo, completed: false}]);
            // clean input space, reset new todoRecord to '', waiting for next input
            setNewTodo('');
        }
        // if just edit previous todoRecord, update
        else {
            updateTodo(newTodo, editState.id, editState.completed);
        }

    };

    return (
        <form>
            <input type={'text'}
                   placeholder={'Please enter a Todo...'}
                   className={'task-input'}
                   value={newTodo}
                   onChange={onInputChange}/>
            <button className={'button-add'}
                    type={'submit'}
                    onClick={onSubmit}>
                {editState ? 'OK': 'Add'}
            </button>
        </form>
    )
}

export default FormComponent