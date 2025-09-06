import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

describe('ToDo App', () => {

  test('добавление новой задачи', () => {
    render(<App /> as React.ReactElement);
    const input = screen.getByPlaceholderText(/Новая задача/i);
    const addButton = screen.getByText(/Добавить/i);

    fireEvent.change(input, { target: { value: 'Тестовая задача' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Тестовая задача')).toBeInTheDocument();
  });

  test('отмечаем задачу как выполненную', () => {
    render(<App /> as React.ReactElement);
    const input = screen.getByPlaceholderText(/Новая задача/i);
    const addButton = screen.getByText(/Добавить/i);

    fireEvent.change(input, { target: { value: 'Задача для чекбокса' } });
    fireEvent.click(addButton);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    const taskText = screen.getByText('Задача для чекбокса');
    expect(taskText).toHaveStyle('text-decoration: line-through');
  });

  test('фильтр невыполненных задач', () => {
    render(<App /> as React.ReactElement);
    const input = screen.getByPlaceholderText(/Новая задача/i);
    const addButton = screen.getByText(/Добавить/i);

    fireEvent.change(input, { target: { value: 'Активная задача' } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: 'Выполненная задача' } });
    fireEvent.click(addButton);

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]); // отмечаем вторую задачу как выполненную

    const activeFilter = screen.getByText('Невыполненные');
    fireEvent.click(activeFilter);

    expect(screen.getByText('Активная задача')).toBeInTheDocument();
    expect(screen.queryByText('Выполненная задача')).not.toBeInTheDocument();
  });

  test('фильтр выполненных задач', () => {
    render(<App /> as React.ReactElement);
    const input = screen.getByPlaceholderText(/Новая задача/i);
    const addButton = screen.getByText(/Добавить/i);

    fireEvent.change(input, { target: { value: 'Активная задача' } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: 'Выполненная задача' } });
    fireEvent.click(addButton);

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]); // отмечаем вторую задачу как выполненную

    const completedFilter = screen.getByText('Выполненные');
    fireEvent.click(completedFilter);

    expect(screen.getByText('Выполненная задача')).toBeInTheDocument();
    expect(screen.queryByText('Активная задача')).not.toBeInTheDocument();
  });

  test('очистка выполненных задач', () => {
    render(<App /> as React.ReactElement);
    const input = screen.getByPlaceholderText(/Новая задача/i);
    const addButton = screen.getByText(/Добавить/i);

    fireEvent.change(input, { target: { value: 'Активная' } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: 'Выполненная' } });
    fireEvent.click(addButton);

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]); // отмечаем вторую задачу как выполненную

    const clearButton = screen.getByText('Очистить выполненные');
    fireEvent.click(clearButton);

    expect(screen.queryByText('Выполненная')).not.toBeInTheDocument();
    expect(screen.getByText('Активная')).toBeInTheDocument();
  });

  test('счетчик оставшихся задач', () => {
    render(<App /> as React.ReactElement);
    const input = screen.getByPlaceholderText(/Новая задача/i);
    const addButton = screen.getByText(/Добавить/i);

    fireEvent.change(input, { target: { value: 'Задача 1' } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: 'Задача 2' } });
    fireEvent.click(addButton);

    const counter = screen.getByText(/Осталось задач/i);
    expect(counter).toHaveTextContent('Осталось задач: 2');

    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[0]);

    expect(counter).toHaveTextContent('Осталось задач: 1');
  });

});
