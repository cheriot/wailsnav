fmt:
	go mod tidy
	go fmt
	go vet
	cd frontend && npm run format
