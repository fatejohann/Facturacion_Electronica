//inicio 
function showToken() {
    hideAllSections();
    document.getElementById("H.TokenSection").style.display = "block";
  }
  
  function showTiposdeDocumento() {
    hideAllSections();
    document.getElementById("H.TiposDocumentoSection").style.display = "block";
  }

function showEmisor() {
    hideAllSections();
    document.getElementById("H.EmisorSection").style.display = "block";
  }
  
  function showReceptor() {
    hideAllSections();
    document.getElementById("H.ReceptorSection").style.display = "block";
  }
  
  
  
  function hideAllSections() {
    document.getElementById("H.TokenSection").style.display = "none";

    document.getElementById("H.TiposDocumentoSection").style.display = "none";

    document.getElementById("H.EmisorSection").style.display = "none";
    
    document.getElementById("H.ReceptorSection").style.display = "none";
    
    
  }
  

  
  