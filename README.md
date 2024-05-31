# Kubernetes Controller

## Prerequites

- Must have installed and running Minikube on local machine

- `kubectl` and `helm` cli tools. 

- Nodejs 

- Docker & Postgres Images


## Steps

1. Run Docker Compose file to setup database

```bash
docker compose up
```

2. Install Dependancy 

```bash
pnpm install
```

3. Run prisma schema and sync to DB 

```bash
pnpx prisma generate 
prisma db push
```

4. Start development server

```bash
pnpm run start:dev
```


