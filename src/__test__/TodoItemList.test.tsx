import { render, screen } from '@testing-library/react'
import { TodoItemList } from '../components/TodoItemList'
import { IItem } from '../models/IItem';

const mockedTodoItems : IItem[] = [
    {
        id: "f31618d8-14d6-4609-9987-4339d39318cc",
        description: "Mocked todo for unit test",
        isCompleted: false
    },
    {
        id: "9d1a9ae8-e5ec-446e-95c3-120f41ea9759",
        description: "Another mocked todo for unit test",
        isCompleted: false
    }
]

let mockedGetItems : jest.Mock<any, any>;
let mockedHandleMarkAsComplete : jest.Mock<any, any>;

beforeEach(() => {
    // Arrange
    mockedGetItems = jest.fn();
    mockedHandleMarkAsComplete = jest.fn();
    
    render(<TodoItemList items={mockedTodoItems} getItems={ mockedGetItems } handleMarkAsComplete={ mockedHandleMarkAsComplete } />)
})

it('renders the todo items', async () => {
    // Act
    const firstTodoItem = screen.getByText('Mocked todo for unit test');
    const secondTodoItem = screen.getByText('Another mocked todo for unit test');

    // Assert
    expect(firstTodoItem).toBeInTheDocument();
    expect(secondTodoItem).toBeInTheDocument();
});

it('the todo item count is correctly shown', async () => {
    // Act
    const itemCount = screen.getByText('Showing 2 Item(s)');

    // Assert
    expect(itemCount).toBeInTheDocument();
})

it('refresh button should call the getItems prop', () => {
    // Act
    const refreshButton = screen.getByRole('button', { name: 'Refresh' });
    refreshButton.click();

    // Assert
    expect(mockedGetItems).toBeCalledTimes(1);
})

it('Mark as completed button should call the handleMarkAsComplete prop', () => {
    // Act
    const markAsCompleteButton = screen.getAllByRole('button', { name: 'Mark as completed'});

    markAsCompleteButton[0].click();

    // Assert
    expect(mockedHandleMarkAsComplete).toBeCalledTimes(1);
})