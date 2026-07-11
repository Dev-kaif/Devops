# Install Docker Engine on Ubuntu

## Install using the `apt` repository

Before you install Docker Engine for the first time on a new host machine, you
need to set up the Docker `apt` repository. Afterward, you can install and update
Docker from the repository.

1. Set up Docker's `apt` repository.

   ```bash
   # Add Docker's official GPG key:
   sudo apt update
   sudo apt install ca-certificates curl
   sudo install -m 0755 -d /etc/apt/keyrings
   sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
   sudo chmod a+r /etc/apt/keyrings/docker.asc

   # Add the repository to Apt sources:
   sudo tee /etc/apt/sources.list.d/docker.sources <<EOF
   Types: deb
   URIs: https://download.docker.com/linux/ubuntu
   Suites: $(. /etc/os-release && echo "${UBUNTU_CODENAME:-$VERSION_CODENAME}")
   Components: stable
   Architectures: $(dpkg --print-architecture)
   Signed-By: /etc/apt/keyrings/docker.asc
   EOF

   sudo apt update
   ```

2. Install the Docker packages.

   **Latest**

   To install the latest version, run:

   ```console
   $ sudo apt install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
   ```

   **Specific version**

   To install a specific version of Docker Engine, start by listing the
   available versions in the repository:

   ```console
   $ apt list --all-versions docker-ce

   docker-ce/noble 5:29.6.1-1~ubuntu.24.04~noble <arch>
   docker-ce/noble 5:29.6.0-1~ubuntu.24.04~noble <arch>
   ...
   ```

   Select the desired version and install:

   ```console
   $ VERSION_STRING=5:29.6.1-1~ubuntu.24.04~noble
   $ sudo apt install docker-ce=$VERSION_STRING docker-ce-cli=$VERSION_STRING containerd.io docker-buildx-plugin docker-compose-plugin
   ```

   > [!NOTE]
   >
   > After installation, verify that Docker is running:
   >
   > ```console
   > $ sudo systemctl status docker
   > ```
   >
   > If Docker is not running, start it manually:
   >
   > ```console
   > $ sudo systemctl start docker
   > ```

3. Verify that the installation is successful by running the `hello-world` image:

   ```console
   $ sudo docker run hello-world
   ```

   This command downloads a test image and runs it in a container. When the
   container runs, it prints a confirmation message and exits.

You have now successfully installed and started Docker Engine.

> [!TIP]
>
> Receiving errors when trying to run without root?
>
> The `docker` user group exists but contains no users, which is why you’re required
> to use `sudo` to run Docker commands. Continue to [Linux postinstall](/engine/install/linux-postinstall)
> to allow non-privileged users to run Docker commands and for other optional configuration steps.
