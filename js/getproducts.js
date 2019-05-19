var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
  if(xhr.readyState ===4) {
    
    
    var produtos = JSON.parse(xhr.responseText);
    var score = 0;
    var jshtml = "";
    var mobileSize = window.matchMedia("(max-width: 767px)");
    var desktopSize = window.matchMedia("(min-width: 768px)");
    
    
   
      for(var i = 0; i < produtos.length ; i+=1 ){
        var produto = produtos[i];      
        if(produto.isActive === true) {
          var oldPrice = produto.oldPrice;
          var oldPriceReal = oldPrice.substring(1, oldPrice.length);
          var oldPriceRealVirgula = oldPriceReal.replace(/\./g, ",");

          var price = produto.price;
          var priceReal = price.substring(1, price.length);
          var priceRealVirgula = priceReal.replace(/\./g, ",");

          var BaseParcelaNum = parseFloat(oldPriceReal);
          var qntParcelasNum = parseInt(produto.installmentTimes);
          var parcelaValorNum = BaseParcelaNum / qntParcelasNum;
          parcelaValorNum = parcelaValorNum.toFixed(2);
          parcelaValorNum = parcelaValorNum.replace(/\./g, ",");


          jshtml += '<div class="col col-produto clearfix">';
          jshtml += '<div class="col col-img-produto">';
          jshtml += '<img src="' + produto.picture + '" alt="' + produto.name + '"></div>';
          jshtml += '<div class="col col-descricao-produto">';
          jshtml += '<section class="produto">';
          jshtml += '<h3>' + produto.name +'</h3>';
          if(desktopSize.matches){
            jshtml += '<p class="descricao">'+ produto.description +'</p>';   
          }         
          jshtml += '<p class="p-original">De: R$ ' + oldPriceRealVirgula +'</p>';
          jshtml += '<p class="p-promocional">Por: R$ ' + priceRealVirgula + '</p>';
          jshtml += '<p class="parcelamento">ou ' + produto.installmentTimes +'x de R$ ' + parcelaValorNum + '</p>';
          jshtml += '<button>Comprar</button>';
          jshtml += '</section></div></div>';
          score += 1;
          if(mobileSize.matches){
            if(score >= 4) {
              break;
            }         
          } else {
            if(score >= 8) {
              break;
            } 
          }
        }      
      }

      document.getElementById('carrega-produto').innerHTML = jshtml;            
  }
};

xhr.open('GET', 'json/myjson.json');
xhr.send(); 











