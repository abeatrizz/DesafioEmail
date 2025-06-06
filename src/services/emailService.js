const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const path = require('path');
const config = require('../config/config');
const logger = require('../utils/logger');

class EmailService {
  constructor() {
    this.transporter = null;
  }

  async init() {
    try {
      logger.info('Configurando transporter de email...');
      this.transporter = nodemailer.createTransport({
        host: config.email.host,
        port: config.email.port,
        secure: config.email.secure,
        auth: config.email.auth
      });

      await this.transporter.verify();
      logger.success('Configuração de email verificada com sucesso');
    } catch (error) {
      logger.error('Erro ao configurar email', error);
      throw error;
    }
  }

  async loadTemplate() {
    try {
      const templatePath = path.join(__dirname, '../../templates/emailTemplate.html');
      const template = await fs.readFile(templatePath, 'utf8');
      return template;
    } catch (error) {
      logger.error('Erro ao carregar template', error);
      throw error;
    }
  }

  generateArticlesHtml(articles) {
    return articles.map(article => `
      <div style="border: 1px solid #ddd; margin: 10px 0; padding: 15px; border-radius: 5px;">
        <h3 style="color: #333; margin: 0 0 10px 0;">
          ${article.link ? `<a href="${article.link}" target="_blank" style="text-decoration: none; color: #0066cc;">${article.title}</a>` : article.title}
        </h3>
        <p style="color: #666; margin: 5px 0; line-height: 1.4;">
          ${article.description}
        </p>
        <small style="color: #999;">📅 ${article.date}</small>
      </div>
    `).join('');
  }

  async sendScrapingReport(scrapingData) {
    try {
      if (!this.transporter) {
        await this.init();
      }

      logger.info('Preparando email...');
      const template = await this.loadTemplate();
      const articlesHtml = this.generateArticlesHtml(scrapingData.articles);

      const htmlContent = template
        .replace('{{SITE_NAME}}', scrapingData.source)
        .replace('{{TOTAL_ARTICLES}}', scrapingData.articles.length)
        .replace('{{SCRAPED_DATE}}', new Date(scrapingData.scrapedAt).toLocaleString('pt-BR'))
        .replace('{{ARTICLES_LIST}}', articlesHtml);

      const mailOptions = {
        from: config.email.from,
        to: config.email.to,
        subject: `📰 Relatório de Notícias - ${scrapingData.source} - ${new Date().toLocaleDateString('pt-BR')}`,
        html: htmlContent
      };

      logger.info('Enviando email...');
      const result = await this.transporter.sendMail(mailOptions);
      logger.success(`Email enviado com sucesso! ID: ${result.messageId}`);
      
      return result;
    } catch (error) {
      logger.error('Erro ao enviar email', error);
      throw error;
    }
  }
}

module.exports = EmailService;