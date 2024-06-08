docker stop botblitz-backend
docker rmi botblitz-backend
docker build -f Dockerfile -t botblitz-backend . 
docker compose -f ../docker-compose-dev.yaml -p app-botblitz up -d
