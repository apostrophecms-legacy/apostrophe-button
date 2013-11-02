function AposButtonWidgetEditor(options) {
  var self = this;

  if (!options.messages) {
    options.messages = {};
  }
  if (!options.messages.missing) {
    options.messages.missing = 'You must enter a URL and text for your button.';
  }

  self.type = 'button';
  options.template = '.apos-button-editor';

  // Parent class constructor shared by all widget editors
  AposWidgetEditor.call(self, options);

  // Override methods
  self.afterCreatingEl = function() {
    self.$url = self.$el.find('.apos-button-url');
    self.$url.val(self.data.url);

    self.$text = self.$el.find('.apos-button-text');
    self.$text.val(self.data.text);
  };

  self.prePreview = beforeUpdate;
  self.preSave = beforeUpdate;

  function beforeUpdate(callback) {
    self.exists = !!self.$url.val();
    if (self.exists) {
      self.data.url = self.$url.val();
      self.data.text = self.$text.val();
    }

    return callback();
  }
}

AposButtonWidgetEditor.label = 'Button';
apos.addWidgetType('button');
