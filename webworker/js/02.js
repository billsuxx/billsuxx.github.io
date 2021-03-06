// inspired by ejohn.org

!(function(win,doc) {

  var app = {

    init: function() {
      var self = this;

      this.counter = 0;
      this.worker  = new Worker('./js/piworker.js');;
      this.logDiv  = doc.querySelector("#log");
      this.piDiv   = doc.querySelector("#PiValue");

      this.interval = setInterval(function(){
        self.logDiv.innerHTML = self.counter++;
      }, 1000);

      this.bindWorkerEvents();

    },

    sendMessage: function(message) {
      this.worker.postMessage(message);
    },

    bindWorkerEvents: function() {
      var self = this;

      this.worker.addEventListener('message', function(e) {
        var data = e.data;
        self.piDiv.innerHTML = data.msg;
        self.piDiv.classList.add(data.type);
      }, false);

      this.worker.addEventListener('error', function(e) {
        alert('Error: Line ' + e.lineno + ' in ' + e.filename + ': ' + e.message);
      }, false);

    }

  };

  app.init();

  doc.querySelector("#generatepi").addEventListener("click", function(){
    doc.querySelector("#PiValue").classList.remove("success");
    doc.querySelector("#PiValue").classList.remove("danger")
    app.sendMessage({'cmd': 'generatePi', 'value':  doc.querySelector("#loop").value});
  });

  doc.querySelector("#stopworker").addEventListener("click", function(){
    app.sendMessage({'cmd': 'terminate'});
  });

})(window,document);
