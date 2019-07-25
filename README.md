# Scrapper for legacy VTEX
Simple vtex template/assets downloader for older versions of vtex;

# For template scrapping

## How it works
```
A simple jQuery like script collect all template itens finding these itens by list classes;
With a list of templates, a robot simulate a click on template link, wait for template load and send a ajax request to a localhost server with the template in the body of request, one by one;
An node server receive post data, create file with equal name as admin page and put template contents
```


## How to run:
```bash
1 - start node server running $ node templateServer.js
2 - open vtex admin and go to the templates page
3 - expand all lists of templates what you want to download
4 - copy templateScrapper.js content, past it and run on inspector console
```

## Important Things:
```
1 - You need to select correct context on console inpector to run templateScrapper.js, because template lists are inside of an iframe
2 - Configure or adjust script timeouts for your internet latency; The right way is using a .ajaxComplete/.ajaxStop jquery funcions or some DOM subtree modified event, but with delay is working nice.
3 - You may need to create template folders (HMTL Templates/Shelves Templates/Sub Templates) inside root folder "/template"
```

# Todo
```bash
1 - Create a assets scrapper for js and css files
2 - Parametrize scrapper configs
3 - Use puppeter
4 - Create uploader robots
5 - Avoid setTimeouts
```