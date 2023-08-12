export interface NewsArticle {
    events: any[]; 
    featured: boolean;
    id: number;
    image_url: string;
    launches: any[];
    news_site: string;
    published_at?: Date;
    summary: string;
    title: string;
    updated_at: string;
    url: string;
}