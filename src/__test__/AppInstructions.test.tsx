import { render, screen } from '@testing-library/react'
import {AppInstructions} from '../components/AppInstructions';

it('renders the technical test instructions', async () => {
  // Arrange
  render(<AppInstructions />)

  // Act
  const header = screen.getByText(/Todo List App/i);
  const instructionHeading = screen.getByText(/Welcome to the ClearPoint frontend technical test/i);

  // Assert
  expect(header).toBeInTheDocument();
  expect(instructionHeading).toBeInTheDocument();
})