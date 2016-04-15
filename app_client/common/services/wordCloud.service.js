(function() {

    angular.module("apilaApp").service("wordCloud", wordCloud);
    
    function wordCloud() {
        
       //returns an where property is the name of the word and a atribute is 
       //the number of time the word repeats
       function count(arr){
          return arr.reduce(function(m,e){
            m[e] = (+m[e]||0)+1;
              return m;
          },{});
    }
        
        function drawWordCloud(wordArr) {
            
           var wordFreq = count(wordArr); 
            
            var wordsArr = [];
            
            for (var property in wordFreq) {
                if (wordFreq.hasOwnProperty(property)) {
                    wordsArr.push({"text": property, "count": wordFreq[property]});
                }
            }
            
           var fill = d3.scale.category20();
              d3.layout.cloud().size([300, 300])
                  .words(wordsArr.map(function(d) {
                  console.log(d);
                    return {text: d.text, size: 12 + d.count};
                  }))
                  .rotate(function() { return ~~(Math.random() * 2) * 90; })
                  .font("Impact")
                  .fontSize(function(d) { return d.size; })
                  .on("end", draw)
                  .start();
            
              function draw(words) {
                d3.select("#wordcloud").append("svg")
                    .attr("width", 700)
                    .attr("height", 300)
                  .append("g")
                    .attr("transform", "translate(250,150)")
                  .selectAll("text")
                    .data(words)
                  .enter().append("text")
                    .style("font-size", function(d) { return d.size + "px"; })
                    .style("font-family", "Impact")
                    .style("fill", function(d, i) { return fill(i); })
                    .attr("text-anchor", "middle")
                    .attr("transform", function(d) {
                      return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                    })
                    .text(function(d) { return d.text; });
              } 
        }
        
        
        return {
            drawWordCloud: drawWordCloud
        }
    }
    
})();