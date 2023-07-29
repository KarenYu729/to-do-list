import './App.css';
import HeaderComponent from "./components/Header";
import FormComponent from "./components/Form";

import {useState} from "react";
import TodoListComponent from "./components/TodoList";

function App() {

    const [newTodo, setNewTodo] = useState('')
    const [todos, setTodos] = useState([])
    const [editState, setEditState] = useState(null);

    return (
        <div className="container">
            <div className={'app-wrapper'}>
                <div>
                    <HeaderComponent/>
                </div>
                <div>
                    <FormComponent
                        newTodo={newTodo}
                        setNewTodo={setNewTodo}
                        todos={todos}
                        setTodos={setTodos}
                        editState={editState}
                        setEditState={setEditState}/>
                </div>
                <div>
                    <TodoListComponent
                        todos={todos}
                        setTodos={setTodos}
                        setEditState={setEditState}/>
                </div>

            </div>
        </div>
    );
}

export default App;
