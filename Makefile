build:
		mkdir -p target/wasm32-unknown-unknown/release
		cargo build --release --target wasm32-unknown-unknown -p boundless_contract
