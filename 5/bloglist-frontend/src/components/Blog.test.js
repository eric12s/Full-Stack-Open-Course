import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

let component
let update

beforeEach(() => {
  const blog = {
    title: 'This is a test',
    author: 'Test',
    url: 'somthingwithtests',
    likes: 3
  }

  update = jest.fn()
  const error = jest.fn()

  component = render(
    <Blog blog={blog} update={update} setErrorMessage={error} setErrColor={error}/>
  )
})

test('renders content with title and author', () => {
  expect(component.container.querySelector('.blog')).toHaveTextContent(
    'This is a test'
  )
  expect(component.container.querySelector('.blog')).toHaveTextContent(
    'Test'
  )
  expect(component.container.querySelector('.blog')).not.toHaveTextContent(
    'somthingwithtests'
  )
  expect(component.container.querySelector('.blog')).not.toHaveTextContent(
    '3'
  )
})

test('reders content with all the details', () => {
  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container.querySelector('.blog')).toHaveTextContent(
    'This is a test'
  )
  expect(component.container.querySelector('.blog')).toHaveTextContent(
    'Test'
  )
  expect(component.container.querySelector('.blog')).toHaveTextContent(
    'somthingwithtests'
  )
  expect(component.container.querySelector('.blog')).toHaveTextContent(
    '3'
  )
})

test('click likes twice with the event handler', () => {
  const button = component.getByText('view')
  fireEvent.click(button)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(update.mock.calls).toHaveLength(2)
})

test('form calls the event handler it received as props with the right details', () => {
  const button = component.getByText('view')
  fireEvent.click(button)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(update.mock.calls).toHaveLength(2)
})