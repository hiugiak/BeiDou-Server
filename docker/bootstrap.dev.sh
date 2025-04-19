#!/bin/bash

set -e

docker compose -f compose.yaml -f compose.dev.yaml --profile dev build

docker compose -f compose.yaml -f compose.dev.yaml --profile dev up -d

docker compose logs -tf