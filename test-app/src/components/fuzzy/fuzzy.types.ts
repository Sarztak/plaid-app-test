export interface Institution {
    institution_id: string;
    name: string;
    country: string;
    logo?: string;
    url?: string;
    [key: string]: string | undefined;
}

export type RowItem =
    | { type: 'unique'; item: Institution }
    | { type: 'duplicate'; name: string; items: Institution[] };
