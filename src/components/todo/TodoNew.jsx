import { useState } from "react";

const TodoNew = (props) => {
    //useState hook
    const { addNewTodo } = props;
    const [valueInput, setValueInput] = useState("Loc");
    const handleOnChange = (name) => {
        // Handle input change
        setValueInput(name);
    };
    const handleClick = () => {
        addNewTodo(valueInput);
        setValueInput(""); // Clear input after adding
    }
    return (
        <div className="todo-new">
            <input type="text" onChange={(event) => handleOnChange(event.target.value)} value={valueInput} />
            <button onClick={handleClick}>Add</button>
            <div>
                My name is {valueInput}
            </div>
        </div>
    )
}

export default TodoNew;