import { useState } from 'react';

interface UploadState {
    isUploading: boolean;
    progress: number;
    error: string | null;
}

interface UploadResponse {
    [key: string]: any;
}

interface FileType extends File {
    uri: string;
}

export const useUploadImages = () => {
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [progress, setProgress] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    const uploadFile = async (file: FileType, endpoint: string): Promise<UploadResponse> => {
        setIsUploading(true);
        setError(null);

        const image = new FormData();
        image.append('file', file);

        try {
            const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}${endpoint}`, {
                method: 'POST',
                body: image,
            });

            if (!response.ok) {
                throw new Error('Erro no upload');
            }

            const data: UploadResponse = await response.json();

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
