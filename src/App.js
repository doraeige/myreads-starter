import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import { Route } from 'react-router-dom'
import BookFinder from "./BookFinder"
import ShelvesPage from "./ShelvesPage"

class BooksApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      books: []
    }
  }
//Getting first set of books
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
    });
  }
//Here the book from BookFinder passes to state, and the book's shelf is updated
  moveBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        this.setState(prevState => ({
          books: prevState.books.filter(b => b.id !== book.id).concat([book])//if book ID does not exist, concat to state books
        }))
      })
      .then(() => {
        this.setState((prevState) => {
          return {
            books: prevState.books.map(findBook => { //loop through state books
              if (book.id === findBook.id) { //if book ID matches a state book ID
                findBook.shelf = shelf  // give it a self
              }
              return findBook;
            })
          }
        })
      })
      .then(() => { //
        BooksAPI.getAll().then((books) => {
          this.setState({ books });
        })
      })
  }







  render() {

    return (
      <div className="app">

        <Route exact path="/" render={() => (
          !this.state.books ? null :

            <ShelvesPage
              books={this.state.books}
              shelf={this.state.shelf}
              key={this.props.key}
              moveBook={this.moveBook}
              book={this.state.book}
            />
        )}
        />

        <Route exact path="/BookFinder" render={() => (
          <BookFinder
            books={this.state.books}
            results={this.props.results}
            key={this.props.key}
            moveBook={this.moveBook}
            book={this.props.book}
            shelf={this.state.shelf}
          />
        )}
        />

      </div>
    )
  }
}

export default BooksApp