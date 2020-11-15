const { ApolloServer, UserInputError, gql } = require('apollo-server')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'THIS_IS_1_A_92_SEC_RET__KEY_82'

const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const User = require('./models/user')

const MONGODB_URI = 'mongodb+srv://fullstack:JiK8BJnaH05Ke7ho@cluster0.tuz7y.mongodb.net/library-graphql?retryWrites=true&w=majority'

mongoose.set('useFindAndModify', false)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Query {
    bookCount(author: String): Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }
  type Mutation {
    addBook(
      title: String!
      author: String
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int
    ): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }  
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }
`

const resolvers = {
  Query: {
    bookCount: (root, args) => {
      // if(!args.id)
        return Book.collection.countDocuments()
      
      // return books.filter(book => book.author === args.author).length
    },
    authorCount: () => Author.collection.countDocuments(),
    allBooks: (root, args) => {
      // if (!args.author && !args.genre)
        return Book.find({})
      
      if(!args.genre)
        return books.filter(book => book.author === args.author)
      
      if(!args.author)
        return books.filter(book => book.genres.includes(args.genre))

      return books.filter(book => book.author === args.author && book.genres.includes(args.genre))
      },
    allAuthors: async () => {
      // authors.map(author => ({
      //   name: author.name,
      //   born: author.born,
      //   bookCount: books.filter(book => book.author === author.name).length
      // }))
      const authors = await Author.find({})
      return authors.map(async authorT => ({
        name: authorT.name,
        born: authorT.born,
        bookCount: (await Book.find({ author: authorT.id })).length
      }))
    },
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser)
        throw new UserInputError('You must log in first!')

      let author = await Author.findOne({ name: args.author })
      console.log(author)
      if (!author) {
        author = new Author({
          name: args.author
        })
        try{
          await author.save()
        } catch(error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      const book = new Book({ ...args, author: author._id })   
      try{ 
        await book.save()
      } catch(error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser)
        throw new UserInputError('You must log in first!')
        
      let author = await Author.findOne({ name: args.name })
      console.log(author)
      if (!author)
        return null
      
      const newAuthor = {
        name: args.name,
        born: args.setBornTo
      }
      console.log('new', newAuthor)
      const updatedAuthor = await Author.findByIdAndUpdate(author._id, newAuthor, { new: true })
      console.log(updatedAuthor)
      return updatedAuthor
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secred' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }
  } 
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
