```
$ docker build -t aphrodite -f .docker/Dockerfile .
$ docker run -v "$PWD/public_html":/usr/local/apache2/htdocs -p 8080:80 -it aphrodite 
```
