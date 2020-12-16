import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from "react-router-dom";
import './App.css';
import Search from './Components/Search';
import ListShelves from './Components/ListShelves';
import OpenSearchButton from './Components/OpenSearchButton';

class BooksApp extends React.Component {
  state = {
    books: [],
    bookshelves : [
      {  
        name: 'Currently Reading',
        booksInShelf: []
      },
     {    
        name: "Want to Read",
        booksInShelf: []
     },
     {
        name: "Read",
        booksInShelf: []
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

  searchBooks = (query) => {
    BooksAPI.search(query)
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
          exact path = "/"
          render = {() => (
            <div>
              <ListShelves
                bookshelves = {this.state.bookshelves}
                books = {this.state.books}

              />
              <OpenSearchButton/>
            </div>
          ) }
        />
        <Route
          path = '/search'
          render = {()=> (
            <Search
              bookshelves = {this.state.bookshelves}
              books = {this.state.books}
              onSearchBooks = {this.searchBooks}
            />
          )}
        />
       
      </div>
    )
  }
}

export default BooksApp;
