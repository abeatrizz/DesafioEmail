const puppeteer = require('puppeteer');
const config = require('../config/config');
const logger = require('../utils/logger');

class TecnoBlogScraper {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async init() {
    try {
      logger.info('Iniciando navegador...');
      this.browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      this.page = await this.browser.newPage();
      await this.page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36');
      logger.success('Navegador iniciado com sucesso');
    } catch (error) {
      logger.error('Erro ao iniciar navegador', error);
      throw error;
    }
  }

  async scrapeNews() {
    try {
      logger.info(`Acessando ${config.scraper.url}`);
      await this.page.goto(config.scraper.url, { 
        waitUntil: 'networkidle2',
        timeout: config.scraper.timeout 
      });

      logger.info('Coletando dados das notícias...');
      const newsData = await this.page.evaluate(() => {
        const articles = [];
        const newsElements = document.querySelectorAll('article, .post, .entry');

        for (let i = 0; i < Math.min(newsElements.length, 5); i++) {
          const element = newsElements[i];
          
          const titleElement = element.querySelector('h1, h2, h3, .title, .entry-title');
          const linkElement = element.querySelector('a[href]') || titleElement?.querySelector('a');
          const descElement = element.querySelector('.excerpt, .summary, p');
          const dateElement = element.querySelector('time, .date, .published');

          if (titleElement && titleElement.textContent.trim()) {
            articles.push({
              title: titleElement.textContent.trim(),
              link: linkElement ? linkElement.href : '',
              description: descElement ? descElement.textContent.trim().substring(0, 200) : '',
              date: dateElement ? dateElement.textContent.trim() : 'Data não informada'
            });
          }
        }

        return {
          articles,
          totalFound: newsElements.length,
          scrapedAt: new Date().toISOString(),
          source: 'TecnoBlog'
        };
      });

      logger.success(`Coletados ${newsData.articles.length} artigos`);
      return newsData;

    } catch (error) {
      logger.error('Erro durante o scraping', error);
      throw error;
    }
  }

  async close() {
    if (this.browser) {
      await this.browser.close();
      logger.info('Navegador fechado');
    }
  }

  async execute() {
    try {
      await this.init();
      const data = await this.scrapeNews();
      await this.close();
      return data;
    } catch (error) {
      await this.close();
      throw error;
    }
  }
}

module.exports = TecnoBlogScraper;