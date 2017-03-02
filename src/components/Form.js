import React from 'react';
import { prefix, suffix } from '../assets/apiUrlStrings';
import { queryApi } from '../actions';
import _ from 'lodash';
import randomColor from '../assets/randomColorFunc';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: '',
      results: {},
      error: ''
    }
  }
  
  componentDidMount() {
    if (!localStorage.searchHistory) {
      localStorage.setItem('searchHistory', JSON.stringify([]));
    } 
    
    if (!_.isEmpty(this.props.passedValue)) {
      const { searchString, searchTerms } = this.props.passedValue;
      this.setState({ input: searchTerms });
      queryApi(searchString).then(
        (results) => this.setState({ results, error: '' }),
        (err) => this.setState({ error: err, errorInput: this.state.input })
      );
    }
  }
  
  handleChange = (e) => {
    this.setState({
      input: e.target.value
    });
  }
  
  buildURL = (_searchTerms) => {
    const urlSuffix = encodeURIComponent(_searchTerms);
    return "https://en.wikipedia.org/wiki/" + urlSuffix;
  }
  
  localStorageManager = (searchInfo) => {
    const storageArr = JSON.parse(localStorage.getItem('searchHistory'));
    const termsArr = storageArr.map(search => search.searchTerms.toLowerCase());
    const currentTerms = searchInfo.searchTerms.toLowerCase();
    if (termsArr.indexOf(currentTerms) === -1) storageArr.push(searchInfo);
    localStorage.setItem('searchHistory', JSON.stringify(storageArr));
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    const searchString = prefix + this.state.input + suffix;
    const searchTerms = this.state.input;
    
    this.localStorageManager({ searchTerms, searchString });
    
    queryApi(searchString).then(
      (results) => this.setState({ results, error: '' }),
      (err) => this.setState({ error: err, errorInput: this.state.input })
    );
  }
  
  render() {
    
    const error = (
      <div className={"ui raised very padded text container segment " + randomColor()}>
        <div className="ui header">{"Search " + this.state.errorInput + " returned no results!"}</div>
      </div>
    );
    
    const resultsDiv = _.map(this.state.results, (val, key) => {
      return (
        <a href={this.buildURL(val.title)} target="_blank" className={"ui raised very padded text container segment " + randomColor()} key={key}>
          <div className="ui header">{val.title}</div>
          {val.extract}
        </a>
      );
    });
    
    return (
      <div style={ { marginTop: 20 } }>
        
        <h1 className="ui centered grid padded" >Wikipedia Viewer</h1>
        
        <form className="ui centered grid" onSubmit={this.handleSubmit} >
          <div style={ { marginBottom: 20 } } className="ui search padded">
            <div className="ui icon input">
              <input value={this.state.input} onChange={this.handleChange} placeholder="Search Wikipedia..." type="text" className="prompt"/>
              <i className="search icon"></i>
            </div>
          </div>
        </form>

        { this.state.error.length > 0 ? error : resultsDiv }
        
      </div>
    );
  }
}

Form.propTypes = {
  passedValue: React.PropTypes.object.isRequired
}

export default Form;