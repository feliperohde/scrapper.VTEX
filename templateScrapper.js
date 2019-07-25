
(function ( $, window ) {

    var downloadedTemplates = 0;

    var templateList = $('.jqueryFileTree .directory.template-folder');

    var getDados = function(idx, mainList, mainListIdx) {

        var listName = $(mainList[mainListIdx]).find("> a").text();
        var listObject = $(mainList[mainListIdx]).find("> .jqueryFileTree .file.template:not(.file.add)");

        var link = $(listObject[idx]).find("> a");

        console.log((idx + 1 ) + " of " + listObject.length + " | list " + (mainListIdx + 1) + " of " + mainList.length);
        if(listObject.length == 0) {
            console.log("invalid list or no itens to scrapp");
            console.info("Robot have been downloaded " + downloadedTemplates + " successfully");
            return;
        }

        link.click();

        setTimeout(function() {

            var myInterval = setInterval(function() {

                if($("#portalBody #tabs").hasClass('ui-tabs')) {

                    console.log('is time to get');

                    clearInterval(myInterval);

                    setTimeout(function() {

                        var editor = ace.edit("editor");
                        var code = editor.getValue();

                        $.ajax({
                            type: "POST",
                            url: "http://localhost:3000",
                            data: { "filename":$("input#templateName").val(), "templateHtml": code, "listName": listName },
                            success: function() {

                                link.parent().css({backgroundColor: "green"});

                                console.warn('template ' + $("input#templateName").val() + ' saved!' );

                                downloadedTemplates ++;

                                if(listObject.length -1 == idx) {
                                    getDados(0, mainList, mainListIdx + 1);
                                } else {
                                    getDados(idx +1 , mainList, mainListIdx);
                                }

                            },
                            dataType: 'html'
                        });

                    }, 200);
                }

            }, 50);

        }, 1000);

    }

    getDados(0, templateList, 0);

}( $, window ));

