FROM debian:latest

# Install system dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    build-essential \
    libssl-dev \
    pkg-config \
    libudev-dev \
    libdbus-1-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Stellar CLI using pre-built binary
RUN curl -fsSL https://github.com/stellar/stellar-cli/releases/download/v22.6.0/stellar-cli-22.6.0-aarch64-unknown-linux-gnu.tar.gz | tar xz -C /usr/local/bin
# Create working directory
WORKDIR /app

# Copy necessary scripts
COPY package*.json ./
COPY scripts/util.ts /app/scripts/util.ts
COPY scripts/initialize.ts /app/scripts/initialize.ts

# Install Node.js and npm
RUN curl -fsSL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs

# Install dependencies for contract bindings
RUN npm install -g typescript tsx

# Set default command
CMD ["npx", "--import", "tsx", "/app/scripts/initialize.ts"]
