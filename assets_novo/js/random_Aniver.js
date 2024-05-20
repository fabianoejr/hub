$(document).ready(function(){

    var array = [];

    $.get("http://localhost/portais/colaborador_novo/index.php/principal/getAniversariantes", function(data) {
      array = data;
    });


    console.log(array);
    var quoteSource = [{ name:"Letícia Colombo Cardozo" }, { name:"João Carlos Braga Rodrigues" }, { name:"Alexandre Bagio da Luz" }];

  //define the containers of the info we target
  var quote = $('#quoteContainer').text();
  var quoteGenius = $('#quoteGenius').text();

  var newQuoteText = quoteSource[0].quote;
  var newQuoteGenius = quoteSource[0].name;

  var timeAnimation = 500;
  var quoteContainer = $('#quoteContainer');
  //fade out animation with callback
  quoteContainer.fadeOut(timeAnimation, function(){
    quoteContainer.html('');
    quoteContainer.append('<p id="quoteGenius">'+'  '+newQuoteGenius+'</p>');
    //fadein animation.
    quoteContainer.fadeIn(timeAnimation);
  });

    setInterval(function(){

      //define the containers of the info we target
      var quote = $('#quoteContainer').text();
      var quoteGenius = $('#quoteGenius').text();

      //getting a new random number to attach to a quote and setting a limit
      var sourceLength = quoteSource.length;
      var randomNumber= Math.floor(Math.random()*sourceLength);
      //set a new quote
      for(i=0; i<=sourceLength; i++){
      var newQuoteText = quoteSource[randomNumber].quote;
      var newQuoteGenius = quoteSource[randomNumber].name;
      //console.log(newQuoteText,newQuoteGenius);
      var timeAnimation = 500;
      var quoteContainer = $('#quoteContainer');
      //fade out animation with callback
      quoteContainer.fadeOut(timeAnimation, function(){
        quoteContainer.html('');
        quoteContainer.append('<p id="quoteGenius">'+'  '+newQuoteGenius+'</p>');

        //fadein animation.
        quoteContainer.fadeIn(timeAnimation);
      });
      break;
      };
    }, 5000);
});