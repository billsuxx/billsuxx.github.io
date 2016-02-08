// inspired by ejohn.org

!(function(win,doc) {

  var interval,
      counter = 0,
      logDiv = doc.getElementById("log"),
      piDiv  = doc.getElementById("PiValue")

  interval = setInterval(function(){
    logDiv.innerHTML = counter++;
  }, 1000);

  function generatePibyWorker() {
    var worker;

    piDiv.classList.remove("success");
    worker = new Worker('./js/piworker.js');

    worker.onmessage = function(e) {
      piDiv.innerHTML = e.data.PiValue;
      piDiv.classList.add("success");
    };

    worker.onerror = function(e) {
      alert('Error: Line ' + e.lineno + ' in ' + e.filename + ': ' + e.message);
    };

    worker.postMessage({'cmd':   'generatePi',
      'value': doc.getElementById("loop").value
    });
  }

  doc.getElementById("generatepi").addEventListener("click", generatePibyWorker);

})(window,document);
