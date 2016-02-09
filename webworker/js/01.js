// inspired by ejohn.org

!(function(win,doc) {

  var interval,
      counter = 0,
      logDiv = doc.getElementById("log")

  interval = setInterval(function(){
    logDiv.innerHTML = counter++;
  }, 1000);

  function generatePi() {
    var loop = doc.getElementById("loop"),
        piDiv = doc.getElementById("PiValue"),
        c = parseInt(loop.value),
        f = parseFloat(loop.value),
        pi = 0, n = 1, i = 0;

    piDiv.classList.remove("success");

    try {
      if (isNaN(c) || f != c ) {
        throw("errInvalidNumber");
      } else if (c<=0) {
        throw("errNegativeNumber");
      }

      for (i;i<=c;i++) {
        pi = pi + (4/n) - ( 4/(n+2) );
        n = n+4;
      }
      piDiv.innerHTML = pi;
      piDiv.classList.add("success");

    } catch (e) {
      var msg = "Input Error: ";
      if (e=="errInvalidNumber")
        msg += "Invalid number.";
      else if (e=="errNegativeNumber")
        msg += "Input must be positive.";
      else
        msg += e.message;

        alert(msg);
    }
  }


  document.getElementById("generatepi").addEventListener("click", generatePi);

})(window,document);
