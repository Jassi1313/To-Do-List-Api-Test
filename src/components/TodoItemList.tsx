import React from 'react'
import { Button, Row, Table } from 'react-bootstrap'
import { IItem } from '../models/IItem'

interface ITodoItemListProps {
    items: IItem[];
    getItems: () => void
    handleMarkAsComplete: (item: IItem) => void;
}

export const TodoItemList = ({ items, getItems, handleMarkAsComplete }: ITodoItemListProps) => {
  return (
    <Row>
      <h1>
        Showing {items.length} Item(s)
        <Button variant="primary" className="pull-right" onClick={() => getItems()}>
          Refresh
        </Button>
      </h1>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: any) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.description}</td>
              <td>
                <Button variant="warning" size="sm" onClick={() => handleMarkAsComplete(item)}>
                  Mark as completed
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Row>
  )
}

