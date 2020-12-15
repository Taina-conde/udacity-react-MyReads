import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from "react-router-dom";
import './App.css';
import Search from './Components/Search';
import ListShelves from './Components/ListShelves';

class BooksApp extends React.Component {
  state = {
    books: [],
    bookshelves : [{
        currentlyReading: {
          name: 'Currently Reading',
          booksInShelf: []
        }
      },
     {
       wantToRead: {
         name: "Want to Read",
         booksInShelf: []
       }
     },
     {
       read: {
         name: "Read",
         booksInShelf: []
       }
     }
    ]
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    
  }
  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })

  }

  render() {
    return (
      <div className="app">
        <Route
          path = "/"
          render = {() => (
            <ListShelves
              bookshelves = {this.state.bookshelves}
              books = {this.state.books}

            />
          ) }
        />
        <Route
          exact path = '/search'
          render = {()=> (
            <Search
              bookshelves = {this.state.bookshelves}
              books = {this.state.books}
            />
          )}
        />
       
      </div>
    )
  }
}

export default BooksApp;
