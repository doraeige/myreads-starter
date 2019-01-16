import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class BookFinder extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            results: []
        }
    }

    searchInput = (query) => {
        const queryTrimmed = query.trim()//remove white space
        //Empty and stop when blank
        if (!queryTrimmed.length) {
            this.setState({results:[]})
            // console.log(query)
            return
            
        }
        if (queryTrimmed !== 0) {
            // console.log(query)
            BooksAPI.search(queryTrimmed)
            .then(returned => {
                if (!returned || returned.error) {
                    this.setState({results:[]})
                    return
                }
                // console.log(returned)
                //comparing result books against shelf books for same IDs
                const sameIDbooks = returned.map(returnedItem => {
                    this.props.books.forEach(book => {
                        if (book.id === returnedItem.id) returnedItem.shelf = book.shelf //If match, pass shelf value
                    })
                    return returnedItem
                })
                this.setState({results:sameIDbooks})
            })
        }
        else {
            this.setState({results:[]})
            return
        }
    }

    render() {
        // console.log(this.state.results.map((book) =>book.shelf))
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        className="close-search"
                        to="/"
                    >Close
             </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            
                            onChange={(e) => this.searchInput(e.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {/*Passing the Book with its props*/}
                        {this.state.results.map((book) =>
                            <li key={book.id}>
                                <Book
                                    thumb={book.imageLinks?book.imageLinks.thumbnail:`http://via.placeholder.com/128x193?text=No%20Cover`}//handling missing images
                                    title={book.title}
                                    authors={book.authors}
                                    shelf={book.shelf}
                                    moveBook={this.props.moveBook}
                                    book={book}
                                />
                            </li>
                        )}

                    </ol>
                </div>
            </div>
        )
    }
}

export default BookFinder