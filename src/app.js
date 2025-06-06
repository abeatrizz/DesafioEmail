const TecnoBlogScraper = require('./scrapers/tecnoBlogScraper');
const EmailService = require('./services/emailService');
const logger = require('./utils/logger');

async function main() {
  const startTime = Date.now();
  
  try {
    logger.info('🚀 Iniciando processo de scraping e envio de email...');
    
    const scraper = new TecnoBlogScraper();
    const emailService = new EmailService();
    
    logger.info('Executando scraping...');
    const scrapingData = await scraper.execute();
    
    if (scrapingData.articles.length === 0) {
      logger.error('Nenhum artigo foi encontrado durante o scraping');
      return;
    }
    
    logger.info('Enviando relatório por email...');
    await emailService.sendScrapingReport(scrapingData);
    
    const executionTime = ((Date.now() - startTime) / 1000).toFixed(2);
    logger.success(`✅ Processo concluído com sucesso em ${executionTime}s`);
    logger.info(`📊 Resumo: ${scrapingData.articles.length} artigos coletados e enviados por email`);
    
  } catch (error) {
    logger.error('❌ Erro durante a execução do processo', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { main };