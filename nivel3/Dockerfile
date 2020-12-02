FROM alpine:3.7

RUN apk update && \
    apk upgrade && \
    apk add bash bind-tools curl libcap net-tools openssl && \ 
    apk add nodejs && \
    apk add sudo && \
    apk add busybox-initscripts rsyslog && \
    apk add dcron wget rsync ca-certificates && \
    ln -s /bin/bash /bin/rbash

RUN mkdir -p /var/log/cron && mkdir -m 0644 -p /var/spool/cron/crontabs && touch /var/log/cron/cron.log && mkdir -m 0644 -p /etc/cron.d

RUN adduser -D -s /bin/sh -h /home/temp_user -g "User" temp_user
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

RUN echo "L3CTF{4r3_y0u_t3ll1ng_m3_y0u_h4ck3d_4_t1m3_m4ch1n3}" > /root/flag

RUN echo "* * * * * /home/temp_user/log.sh" >> /etc/crontabs/root
RUN echo "* * * * * root /home/temp_user/log.sh" >> /etc/crontab
RUN echo -e "* * * * * root /home/temp_user/log.sh\n" > /var/spool/cron/crontabs/CRON_STRINGS

ENTRYPOINT crond -l 0 && su - temp_user

