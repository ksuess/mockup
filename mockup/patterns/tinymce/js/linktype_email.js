define([
  'jquery',
  'mockup-tinymce-linktype-base',
  'text!mockup-patterns-tinymce-url/templates/link.xml',
], function($, BaseLinkType, LinkTemplate) {
  'use strict';

  var EmailLink = BaseLinkType.extend({

    toUrl: function() {
      var self = this;
      var val = self.value();
      if (val) {
        var subject = self.getSubject();
        var href = 'mailto:' + val;
        if (subject) {
          href += '?subject=' + subject;
        }
        return href;
      }
      return null;
    },

    load: function(element) {
      BaseLinkType.prototype.load.apply(this, [element]);
      this.linkModal.$subject.val(this.tiny.dom.getAttrib(element, 'data-subject'));
    },

    getSubject: function() {
      return this.linkModal.$subject.val();
    },

    attributes: function() {
      var attribs = BaseLinkType.prototype.attributes.call(this);
      attribs['data-subject'] = this.getSubject();
      return attribs;
    }

  });


  return {
    plugin: EmailLink,
    name: 'email',
    template: LinkTemplate
  };

});
