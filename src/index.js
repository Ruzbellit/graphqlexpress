const { ApolloServer, gql } = require("apollo-server");


const typeDefs = gql`
  type Book {
    id: String  
    title: String
    author: String
  }

  type Query {
    Getbooks: [Book],
    Getbook(id:String!): Book
  }
  type Mutation {
      CreateBook(id: String!,title: String!, author: String!): Book
      DeleteBook(id: String!): Book
      UpdateBook(id: String!,title: String!, author: String!): Book 
  }

  type Quote {
    id: String  
    quote: String
    author: String
  }
  type Query {
    Getquotes: [Quote],
    Getquote(id:String!): Quote
  }
  type Mutation {
    CreateQuote(id: String!,quote: String!, author: String!): Quote
    DeleteQuote(id: String!): Quote
    UpdateQuote(id: String!,quote: String!, author: String!): Quote 
  }
`;

let books = [
    {
      id:"1",
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      id:"2",  
      title: 'City of Glass',
      author: 'Paul Auster',
    },
    {
       id:"3",  
       title: 'Del amor y otros demonios',
       author: 'Gabriel garcia Marquez',
    }
  ];

  let breakingquotes = [
    {
      "quote": "Free food always tastes good. Free drinks even better.",
      "author": "Hank Schrader",
      "id": "0"
    },
    {
      "quote": "Some people are immune to good advice.",
      "author": "Walter White",
      "id": "1"
    },
    {
      "quote": "Better call Saul!",
      "author": "Saul Goodman",
      "id": "2"
    },
    {
      "quote": "If you believe that there’s a hell, we’re pretty much already going there.",
      "author": "Walter White",
      "id": "3"
    },
    {
      "quote": "Bitch!",
      "author": "Jesse Pinkman",
      "id": "4"
    },
    {
      "quote": "Alright, tell you what. Both of you pull it out your butts right now, or I go grab a flashlight and some pliers and go exploring.",
      "author": "Jesse Pinkman",
      "id": "5"
    },
    {
      "quote": "If I ever get anal polyps, I'll know what to name them.",
      "author": "Saul Goodman",
      "id": "6"
    },
    {
      "quote": "Stop acting like such a baby.",
      "author": "Walter White",
      "id": "7"
    },
    {
      "quote": "Sitting around, smoking marijuana, eating Cheetos and masturbating do not constitute \"plans\".",
      "author": "Walter White",
      "id": "8"
    },
    {
      "quote": "Sometimes the forbidden fruit tastes the sweetest.",
      "author": "Hank Schrader",
      "id": "9"
    }
  ];

  const resolvers = {
    Mutation: {
        CreateBook: (_,arg) => {books.push(arg); return arg},
        DeleteBook: (_,arg) => { 
                                 let finalbooks=books.filter(book => book.id != arg.id);
                                 let bookdeleted = books.find(book => book.id == arg.id );   
                                 books = [...finalbooks]; 
                                 return bookdeleted
                                },
        UpdateBook:(_,arg) => {  let objIdx = books.findIndex(book => book.id == arg.id);
                                 books[objIdx] = arg
                                 return arg   
             
                              },
        CreateQuote: (_, arg) => {
          breakingquotes.push(arg);
          return arg
        },
        DeleteQuote: (_, arg) => {
          let final = breakingquotes.filter(q => q.id != arg.id);
          let deleted = breakingquotes.find(q => q.id == arg.id);
          breakingquotes = [...final];
          return deleted
        },
        UpdateQuote: (_, arg) => {
          let objIdx = breakingquotes.findIndex(q => q.id == arg.id);
          breakingquotes[objIdx] = arg
          return arg
        }                      

    },  
    Query: {
      Getbooks: () => books,
      Getbook: (_,arg) => books.find(number => number.id==arg.id),

      Getquotes: () => breakingquotes,
      Getquote: (_, arg) => breakingquotes.find(q => q.id == arg.id)
    },
  };


const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});