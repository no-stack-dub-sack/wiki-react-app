import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { saveSearchHistory, clearHistory } from '../actions';
import randomColor from '../assets/randomColorFunc';

class SearchHistory extends React.Component {
  
  componentDidMount() {
    this.props.saveSearchHistory(JSON.parse(localStorage.getItem('searchHistory')));
  }
  
  handleClick = (e) => {
    this.props.setSavedSearch({
      searchString: e.currentTarget.id, 
      searchTerms: e.currentTarget.firstElementChild.innerText
    });
  }
  
  handleClear = () => {
    this.props.clearHistory();
    localStorage.setItem('searchHistory', JSON.stringify([]));
  }
  
  render() {
    const results = this.props.searchHistory.map((item, index) => {
      return (
        <Link to="/" key={index} id={item.searchString} onClick={this.handleClick} className={"ui raised very padded text container segment " + randomColor()}>
          <div className="ui header">{item.searchTerms}</div>
        </Link>
      );
    });
    
    const placeholder = (
      <div className={"ui raised very padded text container segment " + randomColor()}>
        <div className="ui header">You haven't run any searches yet!</div>
      </div>
    );
    
    return (
      <div>
        <h1 className="ui centered grid padded">Wiki History</h1>
        <div className="ui centered grid">
          <button onClick={this.handleClear} className="ui button">Clear History</button>
        </div>
        
        <div style={ { marginTop: 30 } }>
          { this.props.searchHistory.length === 0 ? placeholder : results  }
        </div>
        
      </div>
    );
  }
}

SearchHistory.propTypes = {
  searchHistory: React.PropTypes.array.isRequired,
  saveSearchHistory: React.PropTypes.func.isRequired,
  clearHistory: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    searchHistory: state.searches
  }
}

export default connect(mapStateToProps, { saveSearchHistory, clearHistory })(SearchHistory);