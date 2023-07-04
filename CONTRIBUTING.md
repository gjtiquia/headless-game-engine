# Headless Game Engine - Contributing

## Instructions

This monorepo is bootstrapped with Turborepo.

(Optional) It is recommended to install `turbo` globally

```bash
npm install turbo --global
```

In the root directory:

Intall all packages

```bash
npm install
```

Build all packages

```bash
npm run build
```

Test all packages

```bash
npm run test
```

Clean - delete all generated files, turbo cache and node modules

```bash
npm run clean
```

## Publishing

Add a changeset. Good practice to add one per package for cleaner changelogs.

```bash
npm run changeset
```

Follow the prompts in the CLI.

Press spacebar to select and enter to confirm.

Press enter without selecting anything to skip (eg. the major bumps).

Can continue editing the changelog summary later in the generated markdown file.

Commit after adding a changeset(s).
