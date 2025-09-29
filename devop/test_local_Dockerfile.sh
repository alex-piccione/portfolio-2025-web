# ./test_local_Dockerfile.sh

# move where Dockerfile and source code is
cd ..
VERSION=test-0.1.0
docker build -t portfolio-website:$VERSION --build-arg VERSION=$VERSION .

docker run -p 8080:80 portfolio:latest

# open http://localhost:8080
