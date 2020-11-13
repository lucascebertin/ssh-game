FROM alpine:3.7

RUN apk update && \
    apk upgrade && \
    apk add bash bind-tools curl libcap net-tools openssl && \ 
    apk add nodejs && \
    ln -s /bin/bash /bin/rbash

RUN adduser -D -s /bin/rbash -h /home/temp_user -g "User" temp_user
RUN echo "temp_user:hackeduseraccount" | chpasswd

RUN mkdir /home/temp_user/bin && mkdir /home/temp_user/.ssh

COPY ./keys/id_rsa /home/temp_user/.ssh/
COPY ./keys/id_rsa.pub /home/temp_user/.ssh/

RUN chmod 777 /home/temp_user/.ssh/id_rsa

RUN ln -s /bin/ls    /home/temp_user/bin  && \
    chmod u+s /bin/ping && ln -s /bin/ping  /home/temp_user/bin  && \
    cp /etc/profile /home/temp_user/.profile

RUN chown root. /home/temp_user/.profile && \
    chmod 755   /home/temp_user/.profile

USER temp_user

ENTRYPOINT /bin/sh
