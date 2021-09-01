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
test-coverage:
	npx -n --experimental-vm-modules jest --coverage