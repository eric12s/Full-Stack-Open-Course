import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('<BlogForm /> calls the event handler it received as props with the right details', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm handleBlogSubmit={createBlog} />
  )

  const inputTitle = component.container.querySelector('#title')
  const inputAuthor = component.container.querySelector('#author')
  const inputUrl = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(inputTitle, {
    target: { value: 'TestEventTitle' }
  })
  fireEvent.change(inputAuthor, {
    target: { value: 'TestEventAuthor' }
  })
  fireEvent.change(inputUrl, {
    target: { value: 'TestEventUrl' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('TestEventTitle')
  expect(createBlog.mock.calls[0][0].author).toBe('TestEventAuthor')
  expect(createBlog.mock.calls[0][0].url).toBe('TestEventUrl')
  expect(createBlog.mock.calls[0][0].likes).toBe(0)
})