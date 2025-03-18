build:
		mkdir -p target/wasm32-unknown-unknown/release
		cargo build --release --target wasm32-unknown-unknown -p project-contract
		cargo build --release --target wasm32-unknown-unknown -p boundlessContract
