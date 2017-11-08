(function() {
  function selectByValue(select_elm, value) {
    var i = 0;
    for (i = 0; i < select_elm.length; i++)  {
      if (select_elm[i].value == value) {
        select_elm[i].selected = true;
        break;
      }
    }
  }

  document.addEventListener("DOMContentLoaded", function() {
    chrome.storage.sync.get({
      ignore_blank : false,
      tab_shift : 0,
    }, function(settings) {
      document.getElementById("op_ignore_blank").checked = settings.ignore_blank;
      selectByValue(document.getElementById("op_tab_shift"), settings.tab_shift);
    });
  });

  document.getElementById("op_ignore_blank").addEventListener("change", function() {
    var ignore_blank = document.getElementById("op_ignore_blank").checked;
    chrome.storage.sync.set({
      ignore_blank : ignore_blank
    }, function() {
    });
  });

  document.getElementById("op_tab_shift").addEventListener("change", function() {
    var tab_shift = document.getElementById("op_tab_shift").value;
    chrome.storage.sync.set({
      tab_shift : tab_shift
    }, function() {
    });
  });
})();
