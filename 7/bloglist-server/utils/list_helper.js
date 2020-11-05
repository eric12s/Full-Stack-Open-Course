const dummy = (blogs) => {
	return 1
}

const totalLikes = (blogs) => {
	const reducer = (sum, item) =>{
		return item.likes + sum
	}
	return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
	let favorite = {
		title: "",
  	author: "",
  	likes: -1
	}

	blogs.map((blog) =>{
		if(blog.likes > favorite.likes){
			favorite.author = blog.author
			favorite.likes = blog.likes
			favorite.title = blog.title
		}
	})
	return favorite
}

const mostBlogs = (blogs) => {
	let authors = {}

	blogs.map((blog) => {
		const author = blog.author
		if(authors[author] !== undefined)
			authors[author] += 1
		else
			authors[author] = 1
	})

	let mostValue = -1
	let mostKey = '' 
	for(const [key, value] of Object.entries(authors)){
		if(value > mostValue){
			mostValue = value
			mostKey = key
		}
	}
	return mostValue === -1	
	?  { }
	:  { author: mostKey, blogs: mostValue }
}

const mostLikes = (blogs) => {
	let authors = {}

	blogs.map((blog) => {
		const author = blog.author
		if(authors[author] !== undefined)
			authors[author] += blog.likes
		else
			authors[author] = blog.likes
	})

	let mostValue = -1
	let mostKey = '' 
	for(const [key, value] of Object.entries(authors)){
		if (value > mostValue) {
			mostValue = value
			mostKey = key
		}
	}
	return mostValue === -1	
	?  { }
	:  { author: mostKey, likes: mostValue }
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}
