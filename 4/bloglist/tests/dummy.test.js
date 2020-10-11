const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
	const blogs = []

	const result = listHelper.dummy(blogs)
	expect(result).toBe(1)
})

describe('total likes', () => {
	test('of empty list is zero', () => {
		expect(listHelper.totalLikes([])).toBe(0)
	})

	test('when list has only one blog equals the likes of that', () => {
		expect(listHelper.totalLikes([{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Test',
			author: 'Test',
			url: 'Test',
			likes: 5,
			__v: 0
		}])).toBe(5)
	})

	test('of a bigger list is calculated right', () => {
		const blogs = [
			{
				_id: '3a422aa71b52a676214d17f8',
				title: 'Test',
				author: 'Test',
				url: 'Test',
				likes: 1,
				__v: 0
			},
			{
				_id: '4a421aa71b54a666234d17f8',
				title: 'Test',
				author: 'Test',
				url: 'Test',
				likes: 3,
				__v: 0
			},
			{
				_id: '5a421aa70b54a676234d17f9',
				title: 'Test',
				author: 'Test',
				url: 'Test',
				likes: 5,
				__v: 0
			},
			{
				_id: '5a422aa71b54a676234d17f8',
				title: 'Test',
				author: 'Test',
				url: 'Test',
				likes: 8,
				__v: 0
			}
		]

		expect(listHelper.totalLikes(blogs)).toBe(17)
	})
})


describe('favorite blog', () => {
	test('of empty list is empty', () => {
		expect(listHelper.favoriteBlog([])).toEqual({
			title: "",
			author: "",
			likes: -1
		})
	})

	test('when list has only one blog equals the same blog', () => {
		expect(listHelper.favoriteBlog([{
			_id: '5a422aa71b54a676234d17f8',
			title: 'The Favorite One',
			author: 'The Favorite',
			url: 'Test',
			likes: 0,
			__v: 0
		}])).toEqual({ title: 'The Favorite One', author: 'The Favorite', likes: 0 })
	})

	test('of a bigger list is finding the right', () => {
		const blogs = [
			{
				_id: '2a422aa71b54a676234d17f8',
				title: "The Favorite one",
				author: "The favorite",
				likes: 32,
				__v: 0
			},
			{
				_id: '3a422aa71b54a676234d17f8',
				title: "Test",
				author: "Test",
				likes: 10,
				__v: 0
			},
			{
				_id: '4a422aa71b54a676234d17f8',
				title: "Not The Favorite one",
				author: "Not The favorite",
				likes: -8,
				__v: 0
			},
			{
				_id: '5a422aa71b54a676234d17f8',
				title: "Another Test",
				author: "Test",
				likes: 0,
				__v: 0
			}
		]

		expect(listHelper.favoriteBlog(blogs)).toEqual({
			title: "The Favorite one",
			author: "The favorite",
			likes: 32
		})
	})
})

describe('most blogs', () => {
	test('of empty list is empty', () => {
		expect(listHelper.mostBlogs([])).toEqual({})
	})

	test('when list has only one blog equals the same author', () => {
		expect(listHelper.mostBlogs([
			{
				_id: '5a422aa71b54a676234d17f8',
			title: 'The Most One',
			author: 'The Most',
			url: 'Test',
			likes: 1,
			__v: 0
		}
		])).toEqual({ author: 'The Most', blogs: 1 })
	})


	test('of a bigger list is finding the right', () => {
		expect(listHelper.mostBlogs([{
			_id: '5a422aa71b54a676234d17f8',
			title: "Another Test",
			author: "Most One",
			likes: 0,
			__v: 0
		},
		{
			_id: '5a422aa71b54a676234d17f8',
			title: "Another Test",
			author: "Most One",
			likes: 0,
			__v: 0
		},{
			_id: '5a422aa71b54a676234d17f8',
			title: "Another Test",
			author: "Most One",
			likes: 0,
			__v: 0
		},
		{
			_id: '5a422aa71b54a676234d17f8',
			title: "Another Test",
			author: "Test",
			likes: 0,
			__v: 0
		},
		{
			_id: '5a422aa71b54a676234d17f8',
			title: "Another Test",
			author: "Test",
			likes: 0,
			__v: 0
		},
		{
			_id: '5a422aa71b54a676234d17f8',
			title: "Another Test",
			author: "Test2",
			likes: 0,
			__v: 0
		}
	])).toEqual({ author: 'Most One', blogs: 3 })
	})
})

describe('most likes', () => {
	test('of empty list is empty', () => {
		expect(listHelper.mostLikes([])).toEqual({})
	})

	test('when list has only one blog equals the same author', () => {
		expect(listHelper.mostLikes([
			{
				_id: '5a422aa71b54a676234d17f8',
			title: 'The Most One',
			author: 'The Most',
			url: 'Test',
			likes: 3,
			__v: 0
		}
		])).toEqual({ author: 'The Most', likes: 3 })
	})


	test('of a bigger list is finding the right', () => {
		expect(listHelper.mostBlogs([{
			_id: '5a422aa71b54a676234d17f8',
			title: "Another Test",
			author: "Most One",
			likes: 0,
			__v: 0
		},
		{
			_id: '5a422aa71b54a676234d17f8',
			title: "Another Test",
			author: "Most One",
			likes: 0,
			__v: 0
		},{
			_id: '5a422aa71b54a676234d17f8',
			title: "Another Test",
			author: "Most One",
			likes: 0,
			__v: 0
		},
		{
			_id: '5a422aa71b54a676234d17f8',
			title: "Another Test",
			author: "Test",
			likes: 0,
			__v: 0
		},
		{
			_id: '5a422aa71b54a676234d17f8',
			title: "Another Test",
			author: "Test",
			likes: 0,
			__v: 0
		},
		{
			_id: '5a422aa71b54a676234d17f8',
			title: "Another Test",
			author: "Test2",
			likes: 0,
			__v: 0
		}
	])).toEqual({ author: 'Most One', blogs: 3 })
	})
})