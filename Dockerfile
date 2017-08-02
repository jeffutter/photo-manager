FROM node:8-alpine as ui
RUN mkdir -p /src
WORKDIR /src

ADD package.json /src
ADD yarn.lock /src

RUN yarn install

ADD preact.config.js /src
ADD src/ /src/src

RUN mkdir -p apps/photo_management_api_web/priv/static/
RUN yarn run build

FROM elixir:1.5-alpine as build
RUN mkdir -p /src
WORKDIR /src

RUN apk add -U make gcc musl-dev \
    && mix local.hex --force \
    && mix local.rebar --force

ADD mix.exs /src/
ADD mix.lock /src/
ADD apps/images_resource/mix.exs /src/apps/images_resource/
ADD apps/photo_management_api/mix.exs /src/apps/photo_management_api/
ADD apps/photo_management_api_web/mix.exs /src/apps/photo_management_api_web/

RUN mix deps.get

ADD config /src/config
ADD apps /src/apps
ADD rel /src/rel

COPY --from=ui /src/apps/photo_management_api_web/priv/static/ apps/photo_management_api_web/priv/static/

ENV MIX_ENV prod
RUN mix compile
RUN ls -l .
RUN ls -l /src/rel
RUN mix release --env=prod

FROM alpine:3.6
RUN apk add -U imagemagick ncurses-libs libcrypto1.0 \
    && rm -rf /var/cache/apk/*
COPY --from=build /src/_build/prod/rel/photo_management /photo_management
ENTRYPOINT ["/photo_management/bin/photo_management"]
