export interface QuotesDefinition {
    id: number
    quote: string
    author: string
    isFavorite: boolean
    setFavorite: (d: number) => void
}


export const HEART_EYES_EMOJI = '😍';
export const OUTLINE_EMOJI = '🫥';
export const EXPRESSIONLESS_EMOJI = '😶';