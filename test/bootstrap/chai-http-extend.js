/*!
  Extensions to chai-http.

  Copyright Nick Freear, 16 April 2016.
*/

/* jshint -W030 */

'use strict';

var chai = require('chai');

chai.Assertion.addMethod('contentType', function (contentType) {
  var key = 'content-type'
    , reContentType = new RegExp('(^|\/)' + contentType + '(;|$)');
  new chai.Assertion(this._obj).to.have.headers[ key ];
  //Was: new chai.Assertion(this._obj.headers[ key ]).match(reContentType);
  this.assert(
    this._obj.headers[ key ].match(reContentType),
    'expected ' + key + ' header to contain #{exp} but got #{act}',
    'expected ' + key + ' header to not contain #{exp}',
    contentType,
    this._obj.headers[ key ]
  );
});

chai.Assertion.addMethod('charset', function (charset) {
  var key = 'content-type'
    , reCharset = new RegExp('charset=' + charset + '$', 'i'); //Was: /charset=(UTF|utf)-8/
  new chai.Assertion(this._obj).to.have.headers[ key ];
  this.assert(
    this._obj.headers[ key ].match(reCharset),
    'expected ' + key + ' header to contain the charset #{exp} but got #{act}',
    'expected ' + key + ' header to not contain #{exp}',
    charset,
    this._obj.headers[ key ]
  );
});

chai.Assertion.addMethod('utf8', function () {
  new chai.Assertion(this._obj).to.have.charset('utf-8');
});

/* jshint +W030 */
