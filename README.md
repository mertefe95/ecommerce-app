## Handle starting the Backend

## 1 - Create a new terminal first in your VSCode or IDE, then enter below command in the new terminal.

```sh
cd apps/backend
```

## 2 - Migrate tables (only if required, otherwise skip this step.)

```sh
npx prisma migrate dev --name init
```

## 3 - Reset seeds (only if required, otherwise skip this step.)

```sh
npx prisma migrate reset --force init
```
