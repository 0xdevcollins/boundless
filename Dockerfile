FROM rust:latest

RUN apt-get update && apt-get install -y \
    curl \
    git \
    build-essential \
    libssl-dev \
    pkg-config \
    libudev-dev \
    libdbus-1-dev \
    make \
    && rm -rf /var/lib/apt/lists/*

# Install Stellar CLI with architecture detection
RUN ARCH=$(uname -m) && \
    if [ "$ARCH" = "aarch64" ]; then \
        curl -fsSL https://github.com/stellar/stellar-cli/releases/download/v22.6.0/stellar-cli-22.6.0-aarch64-unknown-linux-gnu.tar.gz | tar xz -C /usr/local/bin; \
    else \
        curl -fsSL https://github.com/stellar/stellar-cli/releases/download/v22.6.0/stellar-cli-22.6.0-x86_64-unknown-linux-gnu.tar.gz | tar xz -C /usr/local/bin; \
    fi

WORKDIR /app

COPY . .

RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs

RUN npm install -g typescript tsx
RUN npm install dotenv

ENV STELLAR_ACCOUNT=alice
ENV STELLAR_NETWORK=testnet
ENV STELLAR_NETWORK_PASSPHRASE="Test SDF Network ; September 2015"
ENV STELLAR_RPC_URL="https://soroban-testnet.stellar.org:443"
ENV SOROBAN_SECRET_KEY=SCXO2HH7J7HQF3EXM7N4ZUQMU3UXVJT2W35UNUGRKDDN5GN7MOVRTGU3

# Create a script to handle Stellar key generation
RUN echo '#!/bin/bash\n\
if ! stellar keys ls | grep -q "alice"; then\n\
    stellar keys generate --global "alice" --network testnet --fund\n\
fi' > /usr/local/bin/setup-stellar-keys.sh && \
    chmod +x /usr/local/bin/setup-stellar-keys.sh

# Run native tests first
RUN cargo test --release -p boundless_contract

# Build WASM contract
RUN cargo build --release --target wasm32-unknown-unknown -p boundless_contract

# Create a script to run tests
RUN echo '#!/bin/bash\n\
if [ "$1" = "test" ]; then\n\
    cargo test --release -p boundless_contract\n\
elif [ "$1" = "build" ]; then\n\
    cargo build --release --target wasm32-unknown-unknown -p boundless_contract\n\
else\n\
    npx --import dotenv/config tsx /app/scripts/initialize.ts\n\
fi' > /usr/local/bin/run.sh && \
    chmod +x /usr/local/bin/run.sh

CMD ["/usr/local/bin/run.sh", "default"]
