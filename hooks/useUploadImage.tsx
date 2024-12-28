import { useState } from 'react';

export const useUploadImages = () => {
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const uploadFile = async (file: any, endpoint: string): Promise<any> => {
        setIsUploading(true);
        setError(null);

        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                body: file,
            });

            if (!response.ok) {
                throw new Error('Erro no upload');
            }

            const data = await response.json();

            setIsUploading(false);
            setProgress(0);
            return data;

        } catch (err: any) {
            setIsUploading(false);
            setError(err.message || 'Erro no upload');
            throw err;
        }
    };

    return { uploadFile, isUploading, progress, error };
};
