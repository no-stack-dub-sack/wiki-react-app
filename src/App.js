import React from 'react';
import Form from './components/Form';
import SearchHistory from './components/SearchHistory';
import { Route, NavLink } from 'react-router-dom';
import './App.css';

class App extends React.Component {
  state = {
    savedSearch: {}
  }
  
  setSavedSearch = (searchInfo) => {
    this.setState({ savedSearch: searchInfo });
  }
  
  render() {
    
    const SearchHistoryWrapper = () => {
      return (
        <SearchHistory setSavedSearch={this.setSavedSearch} /> 
      )
    }
    
    const FormWrapper = () => {
      return (
        <Form passedValue={this.state.savedSearch} /> 
      )
    }
    
    return (
      <div>
        <div className="ui two item menu">
          <NavLink activeClassName="active item" className="item" exact to="/">Home</NavLink>
          <NavLink activeClassName="active item" className="item" exact to="/search-history">Seach History</NavLink>
        </div>
        
        
        <Route exact path="/" component={FormWrapper} />
        <Route exact path="/search-history" component={SearchHistoryWrapper} />

      </div>
    );
  }
}

export default App;
