# DesafioEmail
📰 Tech News Scraper
Automatize a leitura de notícias de tecnologia com envio direto para seu e-mail.
Este projeto realiza scraping de conteúdos do Tecnoblog e envia os destaques em um e-mail com layout responsivo.

🔧 Criado como experimento prático para explorar automações com Node.js e aplicar conceitos de organização, integração de serviços e envio de informações relevantes de forma acessível.

✨ Funcionalidades
🔍 Coleta automatizada de notícias do Tecnoblog
📧 Envio por e-mail com template HTML limpo e responsivo
⏰ Agendamento com cron para execução automática
🧠 Tratamento de erros e logs detalhados com Winston
⚙️ Configuração simplificada via .env
📁 Estrutura de pastas organizada e modular
🗂️ Estrutura do Projeto

tech-news-scraper/
├── src/
│   ├── config/                  # Configurações
│   ├── scrapers/               # Lógica de scraping
│   ├── services/               # Envio de e-mail
│   ├── utils/                  # Logger
│   └── app.js                  # Ponto de entrada da aplicação
├── templates/                  # HTML do e-mail
├── logs/                       # Arquivos de log
├── .env                        # Variáveis de ambiente
└── package.json                # Dependências e scripts

🚀 Como Começar
1. Clonar e instalar
git clone <repositorio>
cd tech-news-scraper
npm install

2. Configurar ambiente
cp .env.example .env
Preencha o .env com suas informações:

# Email (Gmail)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=seu_email@gmail.com
EMAIL_PASS=sua_senha_de_app
EMAIL_TO=destinatario@gmail.com

# Scraper
SCRAPE_URL=https://tecnoblog.net
MAX_ARTICLES=5

# Agendamento (a cada 30 min)
CRON_SCHEDULE=0 */30 * * * *
3. Configurar Gmail (se necessário)
Ative a verificação em duas etapas
Gere uma senha de app para "Mail" em myaccount.google.com

🎯 Executando
# Execução única (teste)
npm start

# Modo desenvolvimento (com auto-reload)
npm run dev

# Produção
NODE_ENV=production npm start
⚙️ Exemplos de Agendamento (CRON_SCHEDULE)
# A cada 30 minutos
0 */30 * * * *

# Todo dia às 8h
0 8 * * *

# De segunda a sexta às 9h
0 9 * * 1-5
🌐 Personalizando o Site Alvo
Você pode alterar o endereço para outros portais:
# Olhar Digital
SCRAPE_URL=https://olhardigital.com.br

# Canaltech
SCRAPE_URL=https://canaltech.com.br

✉️ Template do Email
HTML moderno e responsivo
Destaques com título, resumo e link
Informações do autor e data
Botão para “Ler mais”

📊 Logs
logs/combined.log: Todos os eventos
logs/error.log: Apenas erros
Também exibido no console (modo dev)

🛠️ Para Desenvolvedores
Adicionar novo site
Crie um novo arquivo em src/scrapers/
Implemente os métodos scrapeNews() e getArticleDetails()
Atualize app.js para incluir o novo scraper
Editar o email
Modifique templates/email_template.html conforme seu estilo.

🧩 Dicas de Solução de Problemas
Erro ao conectar ao e-mail:
Revise as credenciais no .env
Verifique se a senha de app está correta
Nenhuma notícia coletada:
A estrutura do site pode ter mudado
Teste com MAX_ARTICLES=1
Rate limiting:
Adicione delay
Use proxies ou mude o User-Agent

🤝 Contribuindo
Faça um fork
Crie uma branch com suas alterações
Commit e push
Abra um Pull Request

📄 Licença
Distribuído sob a licença MIT.
Veja o arquivo LICENSE para mais detalhes.

⚠️ Aviso Legal:
Este projeto tem fins educacionais e de portfólio. Respeite os termos dos sites utilizados.

Desenvolvido com Node.js e curiosidade por automações 🚀
