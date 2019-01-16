import React from 'react';
import { Link } from 'react-router-dom'
import BookShelf from "./BookShelf"

class ShelvesPage extends React.Component {

  /* Takes a custom shelf name and returns only the books
   from the specific shelf from the API: see BooksShelves below*/
  filterShelves = (shelf) => {
    return this.props.books.filter((book) =>
      book.shelf === shelf
    )
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">

          <BookShelf
            name="Currently Reading"
            books={this.filterShelves("currentlyReading")} //<--custom shelf name
            book={this.props.book}
            moveBook={this.props.moveBook}
            shelf={this.props.shelf}
          />

          <BookShelf
            name="Want to Read"
            books={this.filterShelves("wantToRead")} //<--custom shelf name
            book={this.props.book}
            moveBook={this.props.moveBook}
            shelf={this.props.shelf}
          />

          <BookShelf
            name="Finished Reading"
            books={this.filterShelves("read")} //<--custom shelf name
            book={this.props.book}
            moveBook={this.props.moveBook}
            shelf={this.props.shelf}
          />

        </div>

        <div className="open-search">
          <Link
            to="/BookFinder"
          >Add a book
        </Link>
        </div>
      </div>
    )
  }
}

export default ShelvesPage
