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
SCRIPT_PATH="/usr/local/bin/project-portfolio_deploy"
echo "command=\"$SCRIPT_PATH\",no-port-forwarding,no-X11-forwarding,no-agent-forwarding,no-pty $KEY" >> ~/.ssh/authorized_keys
```

4. Copy the secret key to GitHub
   `cat deploy_key`

5. Clean up
   `rm deploy_key && rm deploy_key.pub`
