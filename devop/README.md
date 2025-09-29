# devop

## GitHub Action SSH Restricted permission key

Prerequisites:

- The <user> is in the docker group
- The user has ~/.ssh

Use a restricted permission key that can only call the command (symlink to a script) on the server.  
It will run a script that requires docker, and maybe other operations, so use one that has permissions.

1. Create a key pair
   `ssh-keygen -t ed25519 -f deploy_key -N ""` (-N: No passphrase)

2. Add the key to _/home/<user>/.ssh/authorized_keys_

```sh
KEY=$(cat deploy_key.pub)
SCRIPT_PATH="/usr/local/bin/project-portfolio_deploy-website"
echo "command=\"$SCRIPT_PATH\",no-port-forwarding,no-X11-forwarding,no-agent-forwarding,no-pty $KEY" >> ~/.ssh/authorized_keys
```

4. Copy the secret key to GitHub
   `cat deploy_key`

5. Clean up
   `rm deploy_key && rm deploy_key.pub`


## Investigate deploy failure

When thge deploy script fails it is possible to look at the Docker container log to see why it fails to start.  
```sh
# get the id of the failed stack
docker stack ps portfolio-web
stack_id=$(docker stack ps portfolio-web --format "{{.ID}} {{.CurrentState}} {{.Error}}" | grep Failed | awk '{print $1}')
echo "stack_id=$stack_id"

container_id=$(docker inspect $stack_id --format '{{.Status.ContainerStatus.ContainerID}}')
echo "container_id=$container_id"

docker logs $container_id

#docker inspect -it $container_id sh
```
