# Deploy — EasyPanel

O projeto já tem `Dockerfile` + `.dockerignore` na raiz (build multi-stage,
usando `output: "standalone"` do Next.js). O EasyPanel builda a imagem
direto do repositório — não precisa de PM2 nem Nginx manual, ele cuida do
proxy reverso e do SSL.

## 1. Criar o serviço

No EasyPanel: **Create Service → App**.

- **Source**: Git (conecte o repositório e a branch `main`), ou GitHub App
  se preferir deploy automático a cada push.
- **Build method**: Dockerfile (detecta automaticamente pelo arquivo na raiz).
- **Port**: `3000` (é o que o `Dockerfile` expõe).

## 2. Variáveis de ambiente

Em **Environment**, adicione (sem aspas, sem `NEXT_PUBLIC_` se não for
usar pixel/analytics):

```
CHECKOUT_LINK=https://pay.kiwify.com.br/npNOSXo
WHATSAPP_GROUP_LINK=https://chat.whatsapp.com/C3qfBzfllShAVYU91k4SVo
SALES_WHATSAPP_NUMBER=5583996314804
LEAD_WEBHOOK_URL=
DATABASE_URL=
NEXT_PUBLIC_META_PIXEL_ID=
NEXT_PUBLIC_GA_ID=
```

Essas variáveis são lidas em tempo de execução (as páginas da campanha usam
`dynamic = "force-dynamic"`), então **trocar um valor aqui e reiniciar o
serviço já basta** — não precisa rebuildar a imagem.

> `NEXT_PUBLIC_META_PIXEL_ID` e `NEXT_PUBLIC_GA_ID` são exceção parcial: a
> home (`/`) e `/privacidade` são páginas estáticas, então nelas o pixel só
> pega o valor que existia no momento do build. Nas páginas da campanha
> (`vendas`, `quiz`, `obrigado`, `carrinho`) funciona normalmente em runtime.

## 2.1. Banco de dados (leads)

Os leads do quiz continuam indo pro `LEAD_WEBHOOK_URL`, mas agora também são
gravados num Postgres (tabela `leads`, com nome, whatsapp, score e os
`utm_*` de atribuição). Se `DATABASE_URL` não estiver setada, essa parte
simplesmente não roda — nada quebra.

1. No EasyPanel: **Create Service → Postgres** (template pronto, sem
   configuração extra). Dê um nome (ex: `zumbido-db`).
2. Copie a **connection string interna** que o EasyPanel gera pro serviço
   Postgres (algo como
   `postgres://postgres:SENHA@zumbido-db:5432/postgres`) e cole em
   `DATABASE_URL` nas variáveis do serviço da aplicação.
3. Rode a migração uma vez (cria a tabela `leads`) **da sua máquina local**,
   com o repo clonado e `npm install` feito, apontando para a connection
   string **externa/pública** que o EasyPanel expõe pro serviço Postgres
   (Domains/Connection do serviço Postgres — não é a mesma da interna do
   passo 2, que só funciona dentro da rede do EasyPanel):

   ```bash
   DATABASE_URL="postgres://...easypanel-host-externo.../postgres" npm run db:migrate
   ```

   A imagem de produção (`.next/standalone`) não carrega `scripts/` nem
   `db/schema.sql` — a migração não roda de dentro do container, só local.

Depois disso, cada envio do quiz grava uma linha em `leads` além de
encaminhar pro webhook.

## 3. Domínio e SSL

Em **Domains**, adicione o domínio (ex: `zumbidonapratica.com.br`) e ligue
o **Let's Encrypt** — o EasyPanel emite o certificado automaticamente.

## 4. Deploy

Clique em **Deploy**. O EasyPanel builda a imagem a partir do `Dockerfile`
e sobe o container. Builds seguintes (push na branch, ou clique manual em
Deploy) repetem o mesmo processo.

## 5. Testar localmente antes de subir (opcional)

```bash
docker build -t zumbido-na-pratica .
docker run -p 3000:3000 \
  -e CHECKOUT_LINK=... \
  -e WHATSAPP_GROUP_LINK=... \
  -e SALES_WHATSAPP_NUMBER=... \
  zumbido-na-pratica
```

## Nota sobre o `DEPLOY.md`

O `DEPLOY.md` na raiz documenta o fluxo antigo (VPS + PM2 + Nginx manual).
Esse arquivo (`EASYPANEL.md`) é o caminho recomendado agora — mais simples
e sem precisar administrar servidor.
