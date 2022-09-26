fmt:
	go mod tidy
	go fmt
	go vet
	cd frontend && npm run format
	cd frontend && npm run lint
	cd frontend && npm run check

dev:
	cd frontend && pnpm install
	wails dev
