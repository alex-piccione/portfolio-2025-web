# devop

## Deploy

Deploy is executed with a GitHub action that launch a script on a private server.  
The script execution is allowed by a SSH Restricted permission key.  
The description and the procedure is not part of this project.  

## Investigate deploy failure

When thge deploy script fails it is possible to look at the Docker container log to see why it fails to start.  
```sh
# get the id of the failed stack
docker stack ps portfolio-website
stack_id=$(docker stack ps portfolio-website --format "{{.ID}} {{.CurrentState}} {{.Error}}" | grep Failed | awk '{print $1}')
echo "stack_id=$stack_id"

container_id=$(docker inspect $stack_id --format '{{.Status.ContainerStatus.ContainerID}}')
echo "container_id=$container_id"

docker logs $container_id

#docker inspect -it $container_id sh
```
