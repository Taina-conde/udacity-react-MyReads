import React from 'react';
import * as BooksAPI from './BooksAPI';
import { Route } from "react-router-dom";
import './App.css';
import Search from './Components/Search';
import ListShelves from './Components/ListShelves';
import OpenSearchButton from './Components/OpenSearchButton';

class BooksApp extends React.Component {
  state = {
    booksInShelves: [],
    booksSearch : [],
    bookshelves : [
      { 
        id : "currentlyReading", 
        name: 'Currently Reading',
        currentlyReading: [],
      },
     {  
        id: "wantToRead",
        name: "Want to Read",
        wantToRead: [],
     },
     {
        id: "read",
        name: "Read",
        read: []
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
      .then((booksInShelves) => {
        this.setState(() => ({
          booksInShelves
        }))
      })
    
  }
 


  searchBooks = (query) => {
    BooksAPI.search(query)
      .then((booksSearch) => {
        this.setState(()=>({
          booksSearch
        }))
      })
  }

  updateBookshelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then((res) => {
        this.setState((currState)=> ({
          bookshelves: [{
            ...currState.bookshelves[0], 
            currentlyReading : res.currentlyReading
          }, 
          {
            ...currState.bookshelves[1], 
            wantToRead: res.wantToRead
          }, 
          {
            ...currState.bookshelves[2], 
            read: res.read
          }]
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
                booksInShelves = {this.state.booksInShelves}
                onUpdateBookshelf = {this.updateBookshelf}

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
              books = {this.state.booksSearch}
              onSearchBooks = {this.searchBooks}
              onUpdateBookshelf = {this.updateBookshelf}
            />
          )}
        />
       
      </div>
    )
  }
}

export default BooksApp;
