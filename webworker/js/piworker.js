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
    self.postMessage({'msg': pi, 'type': 'success'});
}


self.addEventListener('message', function(e) {
  var data = e.data;

  switch(data.cmd) {
    case 'generatePi':
      generatePi(data.value);
      break;
    case 'terminate':
      self.postMessage({'msg': 'Worker terminated.', 'type': 'danger'});
      self.close();
      break;
    default:
      self.postMessage({'msg': 'Unknown command.' + data.cmd, 'type': 'danger'});
  }
}, false);
