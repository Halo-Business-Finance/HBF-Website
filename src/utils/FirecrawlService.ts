import FirecrawlApp from '@mendable/firecrawl-js';

interface ErrorResponse {
  success: false;
  error: string;
}

interface ScrapeResponse {
  success: true;
  data: {
    markdown?: string;
    content?: string;
    metadata?: {
      title?: string;
      description?: string;
      language?: string;
      keywords?: string;
      robots?: string;
      ogTitle?: string;
      ogDescription?: string;
      ogImage?: string;
      ogUrl?: string;
      sourceURL?: string;
    };
  };
}

interface CrawlStatusResponse {
  success: true;
  status: string;
  completed: number;
  total: number;
  creditsUsed: number;
  expiresAt: string;
  data: any[];
}

type FirecrawlResponse = ScrapeResponse | ErrorResponse;
type CrawlResponse = CrawlStatusResponse | ErrorResponse;

export class FirecrawlService {
  private static API_KEY_STORAGE_KEY = 'firecrawl_api_key';
  private static firecrawlApp: FirecrawlApp | null = null;

  static saveApiKey(apiKey: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, apiKey);
    this.firecrawlApp = new FirecrawlApp({ apiKey });
    console.log('API key saved successfully');
  }

  static getApiKey(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY);
  }

  static async testApiKey(apiKey: string): Promise<boolean> {
    try {
      console.log('Testing API key with Firecrawl API');
      this.firecrawlApp = new FirecrawlApp({ apiKey });
      // A simple test scrape to verify the API key
      const testResponse = await this.firecrawlApp.scrapeUrl('https://example.com');
      return testResponse.success;
    } catch (error) {
      console.error('Error testing API key:', error);
      return false;
    }
  }

  static async scrapeWebsite(url: string): Promise<{ success: boolean; error?: string; data?: any }> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return { success: false, error: 'API key not found' };
    }

    try {
      console.log('Making scrape request to Firecrawl API for URL:', url);
      if (!this.firecrawlApp) {
        this.firecrawlApp = new FirecrawlApp({ apiKey });
      }

      const scrapeResponse = await this.firecrawlApp.scrapeUrl(url, {
        formats: ['markdown', 'html'],
        includeTags: ['main', 'article', 'section', 'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
        excludeTags: ['nav', 'footer', 'header', 'aside', 'script', 'style'],
        onlyMainContent: true
      }) as FirecrawlResponse;

      if (!scrapeResponse.success) {
        console.error('Scrape failed:', (scrapeResponse as ErrorResponse).error);
        return { 
          success: false, 
          error: (scrapeResponse as ErrorResponse).error || 'Failed to scrape website' 
        };
      }

      console.log('Scrape successful:', scrapeResponse);
      
      // Format the response data
      const formattedData = {
        title: scrapeResponse.data.metadata?.title || scrapeResponse.data.metadata?.ogTitle,
        content: scrapeResponse.data.content,
        markdown: scrapeResponse.data.markdown,
        metadata: scrapeResponse.data.metadata
      };

      return { 
        success: true,
        data: formattedData 
      };
    } catch (error) {
      console.error('Error during scrape:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to connect to Firecrawl API' 
      };
    }
  }

  static async crawlWebsite(url: string): Promise<{ success: boolean; error?: string; data?: any }> {
    const apiKey = this.getApiKey();
    if (!apiKey) {
      return { success: false, error: 'API key not found' };
    }

    try {
      console.log('Making crawl request to Firecrawl API');
      if (!this.firecrawlApp) {
        this.firecrawlApp = new FirecrawlApp({ apiKey });
      }

      const crawlResponse = await this.firecrawlApp.crawlUrl(url, {
        limit: 50,
        scrapeOptions: {
          formats: ['markdown', 'html'],
          includeTags: ['main', 'article', 'section', 'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
          excludeTags: ['nav', 'footer', 'header', 'aside', 'script', 'style'],
          onlyMainContent: true
        }
      }) as CrawlResponse;

      if (!crawlResponse.success) {
        console.error('Crawl failed:', (crawlResponse as ErrorResponse).error);
        return { 
          success: false, 
          error: (crawlResponse as ErrorResponse).error || 'Failed to crawl website' 
        };
      }

      console.log('Crawl successful:', crawlResponse);
      return { 
        success: true,
        data: crawlResponse 
      };
    } catch (error) {
      console.error('Error during crawl:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to connect to Firecrawl API' 
      };
    }
  }
}