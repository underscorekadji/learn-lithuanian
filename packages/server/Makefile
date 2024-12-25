.PHONY: up down logs

up:
		docker compose -f docker/docker-compose.dev.yml up -d

down:
		docker compose -f docker/docker-compose.dev.yml down

logs:
		docker compose -f docker/docker-compose.dev.yml logs -f