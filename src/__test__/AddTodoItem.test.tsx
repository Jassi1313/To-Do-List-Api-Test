import { fireEvent, render, screen } from '@testing-library/react'
import { AddTodoItem } from '../components/AddTodoItem'

let mockedHandleAdd : jest.Mock<any, any>;

beforeEach(() => {
    // Arrange
    mockedHandleAdd = jest.fn();
    render(<AddTodoItem handleAdd={mockedHandleAdd} />)
})

test('renders the Add todo input element', async () => {
    // Act
    const addTodoItemInput = screen.getByLabelText("Description");

    // Assert
    expect(addTodoItemInput).toBeInTheDocument();
})

test('renders the Add todo and clear button', async () => {
    // Act
    const addTodoItemButton = screen.getByRole("button", { name: "Add Item" });
    const clearTodoInputButton = screen.getByRole("button", { name: "Clear" });

    // Assert
    expect(addTodoItemButton).toBeInTheDocument();
    expect(clearTodoInputButton).toBeInTheDocument();
})

test('Clicking on Add Item button should call handleAdd with entered todo description', async () => {
    // Act
    const addTodoItemInput = screen.getByLabelText("Description") as HTMLInputElement;
    const addTodoItemButton = screen.getByRole("button", { name: "Add Item" });

    fireEvent.change(addTodoItemInput, { target: { value: "This is a todo item from unit test" } })
    addTodoItemButton.click();

    // Assert
    expect(addTodoItemInput.value).toBe("This is a todo item from unit test")
    expect(mockedHandleAdd).toBeCalledTimes(1);
    expect(mockedHandleAdd).toBeCalledWith({
        description: "This is a todo item from unit test"
    })
})

test('Clicking on Clear button should clear the value from the add todo input', () => {
    // Act
    const addTodoItemInput = screen.getByLabelText("Description") as HTMLInputElement
    const clearTodoInputButton = screen.getByRole("button", { name: "Clear" });

    fireEvent.change(addTodoItemInput, { target: { value: "This todo input value will be cleared"} });

    // Assert
    expect(addTodoItemInput.value).toBe("This todo input value will be cleared")
    clearTodoInputButton.click();
    expect(addTodoItemInput.value).toBe("")
})
