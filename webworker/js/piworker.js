function generatePi(loop) {
    var c = parseInt(loop);
    var f = parseFloat(loop);
    var n=1, i = 0, pi = 0;

    //these errors will need more work…
    if (isNaN(c) || f != c ) {
      throw("errInvalidNumber");
    } else if (c<=0) {
      throw("errNegativeNumber");
    }

    for (i;i<=c;i++) {
      pi=pi+(4/n)-(4/(n+2));
      n=n+4;
    }
    self.postMessage({'PiValue': pi});
}

self.onmessage = function(e) {
  generatePi(e.data.value);
}
