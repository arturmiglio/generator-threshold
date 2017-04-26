

function Tracker(code) {
    this.init(code);
}

Tracker.prototype.init = function(code) {
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', code, 'auto');
  ga('send', 'pageview');
}

Tracker.prototype.trackEvent = function(category, action, label) {
    this.track(['event', category, action, label]);
}

Tracker.prototype.trackPage = function(url) {
    this.track(['pageview', url]);
}

Tracker.prototype.track = function(params) {
    var paramsToSend = ['send'];
    paramsToSend = paramsToSend.concat(params);

    ga.apply(window, paramsToSend);
    console.info('Tracked: ', paramsToSend);
}

module.exports = Tracker;