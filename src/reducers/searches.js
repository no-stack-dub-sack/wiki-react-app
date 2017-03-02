import { POPULATE_SEARCH_HISTORY, CLEAR_HISTORY } from '../actions';

import findIndex from 'lodash/findIndex';

export default function(state = [], action = {}) {
  switch (action.type) {  
    case CLEAR_HISTORY:
      return [];
    case POPULATE_SEARCH_HISTORY:
      var history = action.searchHistory ? 
      action.searchHistory.filter(item => findIndex(state, item) === -1) : [];
      return [
        ...state,
        ...history
      ]
    default: return state;
  }
}

// case SAVE_SEARCH:
//   var index = findIndex(state, action.searchInfo);
//   if (index >= 0) {
//     return state;
//   } else {
//     return [
//       ...state,
//       action.searchInfo
//     ];
//   }