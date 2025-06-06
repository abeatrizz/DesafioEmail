
# 🤖 Tech News Scraper

Um projeto simples e funcional feito com **Node.js** que realiza scraping de notícias de tecnologia do site
[Tecnoblog](https://tecnoblog.net) e envia os resultados por e-mail em um template HTML responsivo.

> Ideal para quem quer automatizar o recebimento de conteúdos atualizados sem precisar acessar o site manualmente.

---

## 🔧 Funcionalidades

- 🔍 Coleta automatizada de notícias de tecnologia
- 📩 Envio de e-mails com visual limpo e responsivo
- ⏰ Agendamentos automáticos via **cron**
- 🛡️ Tratamento de erros robusto
- 📜 Logs com **Winston**
- ⚙️ Configuração fácil via `.env`

---

## 📁 Estrutura do Projeto

```
tech-news-scraper/
├── src/
│   ├── config/                  # Configurações gerais
│   ├── scrapers/               # Scripts de scraping
│   ├── services/               # Serviço de envio de e-mail
│   ├── utils/                  # Logger e utilitários
│   └── app.js                  # Aplicação principal
├── templates/                  # Template HTML do e-mail
├── logs/                       # Arquivos de log
├── .env                        # Variáveis de ambiente
└── package.json                # Dependências do projeto
```

---

## 🚀 Como Usar

### 1. Clonar o repositório e instalar dependências

```bash
git clone <url-do-repositorio>
cd tech-news-scraper
npm install
```

### 2. Configurar variáveis de ambiente

Copie o exemplo de configuração:

```bash
cp .env.example .env
```

E edite o `.env` com seus dados:

```env
# Email (ex: Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_de_app
EMAIL_FROM=seu_email@gmail.com
EMAIL_TO=destinatario@gmail.com

# Configurações do scraper
SCRAPE_URL=https://tecnoblog.net
MAX_ARTICLES=5

# Agendamento com cron (ex: a cada 30 minutos)
CRON_SCHEDULE=0 */30 * * * *
```

> ⚠️ Para Gmail, ative a verificação em duas etapas e gere uma **senha de app** para funcionar corretamente.

---

## 🎯 Executando o Projeto

```bash
# Executar uma vez (modo teste)
npm start

# Modo desenvolvimento (com auto-reload)
npm run dev

# Produção
NODE_ENV=production npm start
```

---

## ⏰ Exemplos de Cron Schedule

```env
# A cada 30 minutos
CRON_SCHEDULE=0 */30 * * * *

# Todos os dias às 8h
CRON_SCHEDULE=0 8 * * *

# De segunda a sexta às 9h
CRON_SCHEDULE=0 9 * * 1-5
```

---

## 🌍 Alterar o site de origem

É possível usar outros sites de notícias de tecnologia, alterando o `SCRAPE_URL` no `.env`:

```env
# Olhar Digital
SCRAPE_URL=https://olhardigital.com.br

# Canaltech
SCRAPE_URL=https://canaltech.com.br
```

---

## 💌 Template do E-mail

O conteúdo do e-mail inclui:

- Título, resumo e link de cada notícia
- Data e autor (quando disponível)
- Layout adaptável para celulares
- Botões de "Ler mais"

---

## 📊 Logs

Os logs são gerados em tempo real e também salvos em arquivos:

- `logs/combined.log`: todos os eventos
- `logs/error.log`: apenas erros

---

## 🛠️ Para Desenvolvedores

### Adicionar novos sites

1. Crie um arquivo novo em `src/scrapers/`
2. Implemente os métodos `scrapeNews()` e `getArticleDetails()`
3. Atualize `src/app.js` para incluir o novo scraper

### Customizar o HTML do e-mail

Edite o arquivo `templates/email_template.html` com seu próprio design ou identidade visual.

---

## 🧩 Scripts úteis

```bash
# Instalar dependências
npm install

# Executar uma vez
npm start

# Modo dev com nodemon
npm run dev

# Ver logs
tail -f logs/combined.log
```

---

## ❗Problemas Comuns

**Erro: conexão com servidor de e-mail**

- Verifique seu `.env`
- Confirme se a senha de app está correta

**Erro: nenhuma notícia encontrada**

- O site pode ter mudado o HTML
- Revise os seletores no scraper

**Rate limit (bloqueio por excesso de acessos)**

- Use `setTimeout` entre requisições
- Mude o User-Agent
- Use proxy se necessário

---

## 🤝 Contribuindo

Contribuições são bem-vindas!

1. Faça um fork do projeto  
2. Crie uma branch com sua feature  
3. Commit suas mudanças  
4. Push e abra um Pull Request

---

## 📄 Licença

Distribuído sob a licença MIT.  

---

⚠️ **Aviso Legal:**  
Este projeto é apenas para fins educacionais. Respeite os termos de uso dos sites acessados e evite sobrecarregar os servidores com requisições automáticas.

---

Desenvolvido com Node.js e curiosidade por automações 🚀
