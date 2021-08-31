install:
	npm ci
publish:
	npm publish --dry-run
	npm link
gendiff:
	node bin/gendiff.js
lint:
	npx eslint .
test:
	npx -n --experimental-vm-modules jest