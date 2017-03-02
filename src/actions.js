import $ from 'jquery';

export const CLEAR_HISTORY = 'CLEAR_HISTORY';
export const POPULATE_SEARCH_HISTORY = 'POPULATE_SEARCH_HISTORY';

export function clearHistory() {
  return {
    type: CLEAR_HISTORY
  }
}

export function saveSearchHistory(searchHistory) {
    return {
      type: POPULATE_SEARCH_HISTORY,
      searchHistory
    }
}

export function queryApi(searchString) {
  return new Promise(function(resolve, reject) {
    $.ajax({
      type: "GET",
      url: searchString,
      dataType: 'jsonp',
      success: data => {
        if (data.query) resolve(data.query.pages);
        else reject('no results!');
      }
    });
  });
}

// export function saveSearch(searchInfo) {
//     return {
//       type: SAVE_SEARCH,
//       searchInfo
//     }
// }