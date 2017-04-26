var _ = require('underscore');

module.exports = {
    /**
     * Parse query string.
     * ?a=b&c=d to {a: b, c: d}
     * @param {String} (option) queryString
     * @return {Object} query params
     */
    getQueryParams: function(queryString) {
      var query = (queryString || window.location.search).substring(1); // delete ?
      if (!query) {
        return false;
      }
      return _
      .chain(query.split('&'))
      .map(function(params) {
        var p = params.split('=');
        return [p[0], decodeURIComponent(p[1])];
      })
      .fromPairs()
      .value();
    }
}