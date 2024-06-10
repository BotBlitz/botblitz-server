docker stop botblitz-frontend
docker rm botblitz-frontend
docker rmi botblitz-frontend
docker build -f Dockerfile -t botblitz-frontend . 
docker compose -f ../docker-compose-dev.yaml -p app-botblitz up -d
