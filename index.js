var extend = require('extend');

module.exports = function(options, callback) {
  return new Construct(options, callback);
};

module.exports.Construct = Construct;

function Construct(options, callback) {
  var apos = options.apos;
  var app = options.app;
  var self = this;


  self._apos = apos;
  self._app = app;

  // Mix in the ability to serve assets and templates
  apos.mixinModuleAssets(self, 'button', __dirname, options);

  // Include our editor template in the markup when aposTemplates is called
  self.pushAsset('template', 'buttonEditor', { when: 'user' });

  // Make sure that aposScripts and aposStylesheets summon our assets
  self.pushAsset('script', 'editor', { when: 'user' });


  apos.itemTypes.button = {
    widget: true,
    label: 'Button',
    css: 'simple-button',
    icon: 'button',
    sanitize: function(item) {
      item.url = apos.sanitizeUrl(item.url);
      item.text = apos.sanitizeString(item.text);
    },
    render: function(data) {
      return self.renderWidget('button', data);
    }
  };


  return setImmediate(function() { return callback(null); });
}
