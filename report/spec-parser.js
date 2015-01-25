/*!
  Spec Parser - parse the text "spec" format output by Mocha et al.

  © 2015 Nick Freear. (15 January 2015..)
*/ 

(function (W) {

  var P = W.SP = {};

//http://stackoverflow.com/questions/1979884/how-to-use-javascript-regex-over-multiple-lines
  P.removePreTest = function (str) {
    return str.replace(/[^]+\$ npm test/m, '')
  };

  P.removePostTest = function (str) {
    return str.replace(/travis_time:end[^]+/m, '')
  };

  P.removeColor = function (str) {
    return str.replace(/\[(0m|2K|0G|32m|90m|31m|92m)/gm, '')
  };


  P.parse = function (spec) {
    var result_r = []
      , lines = spec.split(/\n/)
      , line, j = 0, cls
      , m_passfail, m_ref, m_url, url;

    for (j = 0; j < lines.length; j++) {
      line = lines[j];
      cls = 'line ';
      m_passfail = line.match(/\d (passing|failing)/);
      m_ref = line.match(/\d\) /);
      m_url = line.match(/> Base: ([\w:\.\/\-_]+)/);

      if (line.match(/✓/)) {
        cls += 'tick';
      }
      else if (m_passfail) {
        cls += m_passfail[1];
      }
      else if (line.match(/at .+\.js:\d+\:\d+\)?/)) {
        cls += 'trace';
      }
      else if (line.match(/> \w/)) {
        cls += 'debug';
      }
      else if (m_ref) {
        cls += 'er';
      }
      else if (line.match(/Uncaught \w+Error/)) {
        cls += 'ex';
      }
      else if (line.match(/make\[1\]/)) {
        cls += 'make';
      }

      if (m_url) {
        url = m_url[1];
      }
      //html.push('<div id="line-'+ j +'" class="'+ cls +'">'+ line +'</div>');
	  result_r.push({ line: line, cls: cls });
	}
	return { lines: result_r, url: url };
  };


  P.asHtml = function (result_r) {
    var j, r, html_r = [];
	for (j = 0; j < result_r.length; j++) {
	  r = result_r[j];
	  html_r.push('<div id="line-'+ j +'" class="'+ r.cls +'">'+ r.line +'</div>');
	}
	return html_r.join('');
  };

})(window);
