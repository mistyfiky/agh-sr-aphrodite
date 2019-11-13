```
$ docker build -t aphrodite -f .docker/Dockerfile .
$ docker run -v "$PWD/public_html":/var/www/html -p 8080:80 -it aphrodite 
```
