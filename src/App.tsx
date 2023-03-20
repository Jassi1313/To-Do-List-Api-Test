import './App.scss'
import { Container } from 'react-bootstrap'
import { AppInstructions } from './components/AppInstructions'
import { AppLogo } from './components/AppLogo'
import { AppFooter } from './components/AppFooter'
import { useState, useEffect } from 'react'
import { AddTodoItem } from './components/AddTodoItem'
import { TodoItemList } from './components/TodoItemList'
import { IItem } from './models/IItem'
import { GetAllTodoItems, PostTodoItem, UpdateTodoItem } from './services/TodoItemService'
import { IItemRequest } from './models/IItemRequest'
import { ErrorMessage } from './components/ErrorMessage'
import { AxiosResponse } from 'axios'
import { CREATED, NOCONTENT, SUCCESS } from './constants/StatusCodes'

const App = () => {
  const [items, setItems] = useState<IItem[]>([])
  const [apiRequestFailed, setApiRequestFailed] = useState<boolean>(false)
  const [errors, setErrors] = useState<AxiosResponse>()

  useEffect(() => {
    getItems()
  }, [])

  async function handleAdd(item: IItemRequest) {
    setApiRequestFailed(false)
    const result = await PostTodoItem(item)

    if (result.status === CREATED) {
      getItems()
    } else {
      setErrors(result)
      setApiRequestFailed(true)
    }
  }

  async function getItems() {
    setApiRequestFailed(false)
    const result = await GetAllTodoItems()

    if (result.status === SUCCESS) {
      setItems(result.data)
    } else {
      setErrors(result)
      setApiRequestFailed(true)
    }
  }

  async function handleMarkAsComplete(item: IItem) {
    item.isCompleted = true

    setApiRequestFailed(false)
    const result = await UpdateTodoItem(item)

    if (result.status === NOCONTENT) {
      getItems()
    } else {
      setErrors(result)
      setApiRequestFailed(true)
    }
  }

  return (
    <div className="App">
      <Container>
        <AppLogo />
        <AppInstructions />
        {apiRequestFailed ? <ErrorMessage errors={errors} hideError={setApiRequestFailed} /> : null}
        <AddTodoItem handleAdd={handleAdd} />
        <TodoItemList items={items} getItems={getItems} handleMarkAsComplete={handleMarkAsComplete} />
      </Container>
      <AppFooter />
    </div>
  )
}

export default App
