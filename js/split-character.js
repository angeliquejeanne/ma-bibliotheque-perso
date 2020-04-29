(function() {
    var elements, newContent = "";
    elements = document.getElementsByClassName('split-character'); 
    for (var element = 0; element < elements.length; ++element) { 
      newContent += "<span>"
      for (var character = 0; character < elements[element].innerText.length; character++) {
        if (elements[element].innerText[character] !== " ") { 
          newContent += "<span style='animation-delay: "+ 0.035*character + "s'>"+ elements[element].innerText[character] +"</span>";
        }
        else { 
          newContent += "</span> <span>";
        }
      }
      newContent += "</span>"
      elements[element].innerHTML = newContent; 
      newContent = ""; 
    }
})(); 