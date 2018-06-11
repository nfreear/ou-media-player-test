/*!
  Copyright (c) 2015 Nick Freear.
*/

(function (W) {

  var spec_file = "../_out/report-spec.txt"
    , json_file = "../_out/report.json"
    , get = W.superagent.get
    , q = function (s) { return document.querySelector(s); }
    , $spec = q("#report-spec")
    , $date = q("#test-date span")
    , $version = q("#report-urls [href *= version]")
    , $url  = q("#test-url a");

  json_file = W.location.href.match(/json/) ? json_file : false;

  get(spec_file, function (resp) {
    var doc = resp && resp.text
      , result_r = SP.parse(doc)
      , html = SP.asHtml(result_r.lines);

    $spec.innerHTML = html;
    $date.innerHTML = resp.headers['last-modified'];
    //$version.href = result_r.url + '/version.json';
    $url.innerHTML = $url.href = result_r.url;
  });


  if (json_file) {
    get(json_file, function (resp) {
      var spec;
      console.log(resp);
      if (200 === resp.status) {
        try {
          spec = JSON.parse(resp.text);
        } catch (ex) {
          spec = "Error:" + ex.message;
        }
        console.log("Test report (JSON):", spec);

        $date.innerHTML = resp.headers['last-modified'];
      }
    });
  }

})(window);
