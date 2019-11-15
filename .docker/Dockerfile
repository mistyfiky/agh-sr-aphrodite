FROM httpd:2.4
COPY ./.docker/httpd-custom.conf /usr/local/apache2/conf/extra/httpd-custom.conf
RUN echo "Include conf/extra/httpd-custom.conf" >> conf/httpd.conf
COPY ./public_html/ /usr/local/apache2/htdocs/
