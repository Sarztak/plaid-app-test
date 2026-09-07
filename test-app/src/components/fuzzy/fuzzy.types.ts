export interface Institution {
    institution_id: string;
    name: string;
    country: string;
    logo?: string;
    url?: string;
    [key: string]: string;
}