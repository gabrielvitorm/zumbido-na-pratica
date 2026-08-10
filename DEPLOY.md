# Deploy — VPS Hostgator (do zero)

## 1. Preparar a VPS

```bash
ssh root@SEU_IP

# Node LTS via nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
source ~/.bashrc
nvm install --lts

# PM2 global
npm install -g pm2

# Nginx
apt update && apt install -y nginx certbot python3-certbot-nginx
```

## 2. Enviar o código

Do seu computador, dentro da pasta do projeto:

```bash
rsync -avz --exclude node_modules --exclude .next --exclude .git ./ root@SEU_IP:/var/www/zumbido-lps
```

Ou clone via git se o repositório estiver hospedado remotamente.

## 3. Configurar variáveis de ambiente

Na VPS, dentro de `/var/www/zumbido-lps`, crie `.env.production` com os valores reais:

```
CHECKOUT_LINK=...
WHATSAPP_GROUP_LINK=...
LEAD_WEBHOOK_URL=...
NEXT_PUBLIC_META_PIXEL_ID=...
NEXT_PUBLIC_GA_ID=...
```

## 4. Build e start

```bash
cd /var/www/zumbido-lps
npm ci
npm run build
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
pm2 start ecosystem.config.js
pm2 save
pm2 startup   # siga a instrução impressa pra sobreviver a reboot
```

## 5. Nginx + SSL

```bash
cp deploy/nginx.conf.example /etc/nginx/sites-available/zumbido-lps
# edite /etc/nginx/sites-available/zumbido-lps e troque SEU_DOMINIO_AQUI pelo domínio real
ln -s /etc/nginx/sites-available/zumbido-lps /etc/nginx/sites-enabled/
nginx -t
systemctl reload nginx

certbot --nginx -d SEU_DOMINIO_AQUI
```

## 6. Atualizar depois de mudanças (redeploy)

```bash
cd /var/www/zumbido-lps
git pull   # ou rsync novamente
npm ci
npm run build
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
pm2 reload zumbido-lps
```

## 7. Nova campanha no futuro

Adicione a pasta em `app/(campaigns)/<nova-campanha>` com seu próprio `content.ts`/`config.ts`,
reaproveitando os componentes de `/components`. Nenhuma mudança de infraestrutura (Nginx/PM2) é
necessária — o mesmo processo Next.js serve todas as campanhas do domínio.
