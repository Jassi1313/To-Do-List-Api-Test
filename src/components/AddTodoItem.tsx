import React, { useState } from 'react'
import { Container, Form, Row, Col, Stack, Button } from 'react-bootstrap'
import { IItemRequest } from '../models/IItemRequest';

interface IAddTodoItemProps {
  handleAdd: (item: IItemRequest) => void;
}

export const AddTodoItem = ({ handleAdd }: IAddTodoItemProps) => {
  const [description, setDescription] = useState<string>('');

  const addItem = (description: string) => {
    handleAdd({
      description
    })
  }

  const handleDescriptionChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  }

  function handleClear() {
    setDescription('')
  }

  return (
    <Row>
      <Container>
        <h1>Add Item</h1>
        <Form.Group as={Row} className="mb-3" controlId="formAddTodoItem">
          <Form.Label column sm="2">
            Description
          </Form.Label>
          <Col md="6">
            <Form.Control
              type="text"
              placeholder="Enter description..."
              value={description}
              onChange={handleDescriptionChange}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3 offset-md-2" controlId="formAddTodoItem">
          <Stack direction="horizontal" gap={2}>
            <Button variant="primary" onClick={() => addItem(description)}>
              Add Item
            </Button>
            <Button variant="secondary" onClick={() => handleClear()}>
              Clear
            </Button>
          </Stack>
        </Form.Group>
      </Container>
    </Row>
  )
}
