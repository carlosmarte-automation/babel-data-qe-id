.PHONY: help

help: ## Setup help documentation
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.DEFAULT_GOAL := help

DIST=./dist

build: clean-build build-generate build-common build-esm ## build project

build-common: ## format all documents
	npx tsc -p ./tsconfig.json --outDir ./build/cjs

build-esm: ## format all documents
	npx tsc -p ./tsconfig.esm.json --outDir ./build/mjs

build-generate: ## generate code/configuration base on data
	node ../../internal/generate-index.js
	node ../../internal/generate-pkg-types.js

clean-build: ## format all documents
	rm -rf ./build

test: unit-test ## format all documents

unit-test: ## format all documents
	npx jest

unit-test-watch: ## format all documents
	npx jest --watch