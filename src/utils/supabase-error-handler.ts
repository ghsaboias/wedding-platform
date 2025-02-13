export type SupabaseError = {
    message: string;
    code?: string;
    details?: string;
};

export const handleSupabaseError = (error: any): SupabaseError => {
    console.error('Supabase error:', error);

    if (error?.code === 'PGRST116') {
        return {
            message: 'Invalid permissions',
            code: error.code,
            details: 'You do not have permission to perform this action'
        };
    }

    if (error?.code?.startsWith('22')) {
        return {
            message: 'Invalid data format',
            code: error.code,
            details: error.message
        };
    }

    if (error?.code === '23505') {
        return {
            message: 'Duplicate entry',
            code: error.code,
            details: 'This record already exists'
        };
    }

    return {
        message: 'An unexpected error occurred',
        code: error?.code,
        details: error?.message
    };
};

export const isSupabaseError = (error: any): error is SupabaseError => {
    return error && typeof error.message === 'string';
}; 