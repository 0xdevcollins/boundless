#!/bin/bash

# Build the Docker image
docker build -t boundless .

# Create and start a container in detached mode
echo "Running initialization script..."
container_id=$(docker create boundless)
docker start $container_id

# Execute initialization and create directories with proper setup
echo "Executing initialization script and creating directories..."
docker exec $container_id /bin/sh -c "
    mkdir -p /app/.stellar /app/packages /app/src/contracts && \
    chmod -R 777 /app/.stellar /app/packages /app/src/contracts && \
    cd /app && \
    npm install && \
    npx tsx ./scripts/initialize.ts
"

# Create necessary directories locally
mkdir -p \
    target/wasm32-unknown-unknown/release \
    .stellar \
    packages \
    src/contracts

echo "Copying generated files from container..."
docker cp $container_id:/app/target/wasm32-unknown-unknown/release/boundless_contract.wasm ./target/wasm32-unknown-unknown/release/
docker cp "$container_id:/app/.stellar/." "./.stellar/"
docker cp "$container_id:/app/packages/." "./packages/"
docker cp "$container_id:/app/src/contracts/." "./src/contracts/"

docker stop $container_id
docker rm $container_id

echo "Build complete! Generated files have been copied to your local directory." 
