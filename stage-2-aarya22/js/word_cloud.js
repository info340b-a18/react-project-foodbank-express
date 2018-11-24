//Adapted from 
//http://bl.ocks.org/ericcoopey/6382449
//and https://github.com/jasondavies/d3-cloud

var stopwords = ["i", "me", "my", "myself", "we", "our", "ours", "ourselves", "you", "your", "yours", "would", "yourself", "yourselves", "he", "him", "his", "himself", "she", "her", "hers", "herself", "it", "its", "itself", "they", "them", "their", "theirs", "themselves", "what", "which", "who", "whom", "this", "that", "these", "those", "am", "is", "are", "was", "were", "be", "been", "being", "have", "has", "had", "having", "do", "does", "did", "doing", "a", "an", "the", "and", "but", "if", "or", "because", "as", "until", "while", "of", "at", "by", "for", "with", "about", "against", "between", "into", "through", "during", "before", "after", "above", "below", "to", "from", "up", "down", "in", "out", "on", "off", "over", "under", "again", "further", "then", "once", "here", "there", "when", "where", "why", "how", "all", "any", "both", "each", "few", "more", "most", "other", "some", "such", "no", "nor", "not", "only", "own", "same", "so", "than", "too", "very", "s", "t", "can", "will", "just", "don", "should", "now"];
var punctuation = ['!', '\"', '#', '$', '%', '&', '()', '*', '+', ',' , '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', ']', '^', '_', '`', '{', '|', '}', '~', "", "\”"];
var id = 1;
var publication_ids = [];

$.getJSON("news_data/shorter_articles.json", 
        function(article_list) {
                var content_list = article_list.content;
                var author_list = changeToSelect2(article_list.author);
                var publication_list = changeToSelect2(article_list.publication);
                var title_list = changeToSelect2(article_list.title);
                var year_list = changeToSelect2(article_list.year);
                
                $('#author-select').select2({
                        theme: "classic",
                        data: author_list
                });

                $('#publication-select').select2({
                        theme: "classic",
                        data: publication_list
                });

                // $('#year-select').select2({
                //         theme: "classic",
                //         data: year_list
                // });

                $('#title-select').select2({
                        theme: "classic",
                        data: title_list
                });

                $('#title-select').on('select2:select', function (e) {
                        e.preventDefault();
                        var id = parseInt($('#title-select').select2('data')[0].id);
                        var author = article_list.author[id];
                        var year = article_list.year[id];
                        var publication = article_list.publication[id];
                        resetSelect(id);
                        drawWordCloud(id);
                });

                $('#publication-select').on('select2:select', function (e) {
                        e.preventDefault();
                        limitTitles($('#publication-select').select2('data')[0].text);
                });

                $('#author-select').on('select2:select', function (e) {
                        e.preventDefault();
                        limitTitles($('#author-select').select2('data')[0].text);
                });

                // $('#year-select').on('select2:select', function (e) {
                //         e.preventDefault();
                //         console.log($('#year-select').select2('data')[0].text);
                //         limitTitles($('#year-select').select2('data')[0].text);
                // });

                function resetSelect(titleID) {
                        // $('#author-select').select2('data', {id: titleID, text: article_list.author[titleID]});
                        // $('#publication-select').select2('data', {id: titleID, text: article_list.publication[titleID]});
                        // $('#author-select').trigger('change.select2');
                        // $('#publication-select').trigger('change.select2');
                        $('#author-select').val("").trigger('change.select2');
                        // $('#year-select').val(id).trigger('change.select2');
                        $('#publication-select').val("").trigger('change.select2');
                }

                function limitTitles(value) {
                        var result = publication_ids.filter(obj => {
                                return obj.name === value
                        });
        
                        new_titles = [];
                        result[0].ids.forEach(id => {
                                new_titles.push(title_list[id]);
                        })

                        $('#title-select').empty();
                        $('#title-select').select2({
                                data: new_titles
                        });
                        $('#title-select').trigger('change');

                        resetSelect(parseInt($('#title-select').select2('data')[0].id));
                        drawWordCloud(parseInt($('#title-select').select2('data')[0].id));
                }

                function changeToSelect2(l) {
                        var select2List = [];
                        var textSet = [];
                        for (var idx in l) {
                                idx = parseInt(idx);
                                if (textSet.indexOf(l[idx]) < 0) {
                                        select2List.push({"id": idx, "text": l[idx]});
                                        textSet.push(l[idx]);
                                        var item_count = {};
                                        item_count.name = l[idx];
                                        item_count.ids = [];
                                        publication_ids.push(item_count);
                                } 
                                var result = publication_ids.filter(obj => {
                                        return obj.name === l[idx]
                                });
                                result[0].ids.push(idx);
                        }
                        return select2List;
                }     

                function generate_frequencies(content) {
                        //remove all punctuations
                        const tokenizer = (text) =>
                                text.toLowerCase()
                                .replace(/[.,\/#!$?’%\^&\*;:{}=\-_`~()“——]/g,"")
                                .split(" ")
                        content = tokenizer(content);
                        var frequency_list= {"results":[]};
                        var word_set = [];
                        content.forEach(element => {
                                element = element.trim()
                                // check if word is a stopword or is punctuation
                                if (stopwords.indexOf(element) === -1 && punctuation.indexOf(element) === -1) {
                                        // check if word exists in frequency list
                                        var wordIndex = word_set.indexOf(element);
                                        if (wordIndex <= 0) {
                                                // create a new word object 
                                                var word = {}
                                                word.id = id;
                                                word.text = element
                                                word.size = 1
                                                id = id + 1;
                                        } else {
                                                // append to existing word object
                                                var word = frequency_list.results[wordIndex];
                                                word.size = word.size + 1;
                                        }
                                        word_set.push(element);
                                        frequency_list.results.push(word);
                                } 
                        });
                        return frequency_list;
                }

                drawWordCloud(parseInt($('#title-select').select2('data')[0].id));
                

                function drawWordCloud(titleID) {
                        $("svg").remove();
                        var frequency_list = generate_frequencies(content_list[titleID]);
                        var author = article_list.author[titleID];
                        var title = article_list.title[titleID];
                        var publication = article_list.publication[titleID];

                        var docInfo = document.getElementById("article-info");

                        while (docInfo.firstChild) {
                                docInfo.removeChild(docInfo.firstChild);
                        }

                        if (title != null) {
                                var titleTag = document.createElement("h2");
                                titleTag.appendChild(document.createTextNode(title));
                                docInfo.appendChild(titleTag);
                        }

                        if (author != null) {
                                var authorTag = document.createElement("P");
                                authorTag.appendChild(document.createTextNode(author));
                                docInfo.appendChild(authorTag);
                        }    
                        
                        if (publication != null) {
                                var publicationTag = document.createElement("P");
                                publicationTag.appendChild(document.createTextNode(publication));
                                docInfo.appendChild(publicationTag);
                        }
                        
                        var frequency_list = generate_frequencies(content_list[parseInt($('#title-select').select2('data')[0].id)]);
                        var color = d3.scale.linear()
                                .domain([0,3,4,10,15,20])
                                .range(["#e4f4dc", "#c9e9ba", "#aedd97", "#94d274", "#79c753", "#69bf3e", "#5da937", "#519430", "#467f29", "#3a6a22"]);

                        d3.layout.cloud().size([window.innerWidth / 2, window.innerHeight / 2])
                                .words(frequency_list.results.slice(0, 150))
                                .rotate(0)
                                .fontSize(function(d) { return d.size*5; })
                                .on("end", draw)
                                .start();
                        
                        function draw(words) {
                                d3.select(".cloud-container").append("svg")
                                        .attr("width", window.innerWidth)
                                        .attr("height", window.innerHeight)
                                        .attr("class", "wordcloud")
                                        .append("g")
                                        .attr("transform", "translate(" + window.innerWidth * 0.32 + "," + window.innerHeight / 2.3 + ")")                                  
                                        .selectAll("text")
                                        .data(words)
                                        .enter().append("text")
                                        .style("font-size", function(d) { return d.size + "px"; })
                                        .style("fill", function(d, i) { return color(i); })
                                        .attr("transform", function(d) {
                                                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                                        })
                                        .text(function(d) { return d.text; });
                        }
                }
        }
);

