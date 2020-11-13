FROM alpine:3.7

ARG DOCKER_CLI_VERSION="17.06.2-ce"
ENV DOWNLOAD_URL="https://download.docker.com/linux/static/stable/x86_64/docker-$DOCKER_CLI_VERSION.tgz"

RUN apk update && \
    apk upgrade && \
    apk add bash bind-tools curl libcap net-tools openssl tar && \ 
    apk add nodejs && \
    ln -s /bin/bash /bin/rbash && \
    mkdir -p /tmp/download \
    && curl -L $DOWNLOAD_URL | tar -xz -C /tmp/download \
    && mv /tmp/download/docker/docker /usr/local/bin/ \
    && rm -rf /tmp/download \
    && apk del curl \
    && rm -rf /var/cache/apk/*

RUN adduser -D -s /bin/rbash -h /home/temp_user -g "User" temp_user
RUN echo "temp_user:hackeduseraccount" | chpasswd

RUN mkdir /home/temp_user/bin && mkdir /home/temp_user/.ssh

RUN ln -s /bin/ls    /home/temp_user/bin  && \
    chmod u+s /bin/ping && ln -s /bin/ping  /home/temp_user/bin  && \
    cp /etc/profile /home/temp_user/.profile

RUN chown root. /home/temp_user/.profile && \
    chmod 755   /home/temp_user/.profile

WORKDIR /app

COPY ./package.json ./package-lock.json ./tsconfig.json ./
RUN npm install

COPY . .
RUN npm run build

ENTRYPOINT [ "npm", "run", "start" ]
