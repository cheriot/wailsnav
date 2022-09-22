fmt:
	go mod tidy
	go fmt
	go vet
	cd frontend && npm run format

dev:
	cd frontend && pnpm install
	wails dev
