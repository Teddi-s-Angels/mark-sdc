import React from 'react'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchInput: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSearch = props.handleSearch.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    let value = event.target.value;
    this.setState({searchInput: value})
  }

  handleSubmit(event) {
    event.preventDefault();
    this.handleSearch(this.state.searchInput)
  }

 
  render() {
    return (
      <div id='searchBar'>
        <input type='text' onChange={this.handleChange} value={this.state.searchInput} />
        <input type='submit' onClick={this.handleSubmit}/>
      </div>
    )
  }
}

export default Search