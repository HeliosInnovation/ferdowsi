# Changesets

Every PR that changes the published package should include a changeset. Run:

```sh
pnpm changeset
```

Pick the bump type (`patch` / `minor` / `major`) and describe the change. The text ends up in `CHANGELOG.md`.

On merge to `main`, the release workflow opens a "chore: release" PR. Merging that PR publishes to npm.
