#!/usr/bin/env bash
set -e

echo "stopping containers"
docker-compose down

echo "pruning unused docker images + build cache"
docker system prune -a -f

echo "pulling latest code"
git pull

echo "building + starting"
docker-compose up -d --build

echo "tailing logs"
docker-compose logs -f --tail 50
