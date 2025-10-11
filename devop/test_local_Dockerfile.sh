# move where Dockerfile and source code is
cd ..
CONFIGURATION_FILE=configuration_local.json
VERSION=local-1
docker build   \
    -t portfolio-website:$VERSION \
    --build-arg CONFIGURATION_FILE=$CONFIGURATION_FILE \
    --build-arg VERSION=$VERSION \
    .

docker run -p 8081:80 --name portfolio-website portfolio-website:$VERSION

# open http://localhost:8081
