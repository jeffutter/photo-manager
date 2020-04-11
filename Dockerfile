FROM node:12.16.2-stretch as ui
RUN mkdir -p /src
WORKDIR /src

RUN apt-get update && apt-get install -y brotli

ADD package.json /src
ADD yarn.lock /src

RUN yarn install

ADD webpack.config.js /src
ADD bsconfig.json /src/bsconfig.json
ADD graphql_schema.json /src/graphql_schema.json
ADD src/ /src/src
ADD __tests__/ /src/__tests__
ADD public/ /src/public

RUN mkdir -p apps/photo_management_api_web/priv/static/
RUN yarn run webpack:production

FROM elixir:1.8-otp-22-alpine as build
RUN mkdir -p /src
WORKDIR /src

RUN apk add -U git make gcc musl-dev \
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
RUN mix release --env=prod

FROM elixir:1.8-otp-22-alpine
RUN apk add -U bash ncurses-libs libcrypto1.1 bc imagemagick vips vips-tools \
    && rm -rf /var/cache/apk/*
COPY --from=build /src/_build/prod/rel/photo_management /photo_management
ENTRYPOINT ["/photo_management/bin/photo_management"]
