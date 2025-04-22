const useGenerateRandomFilename = (id: string, extension: string): string => {
    const timestamp = Date.now(); 
    const randomNumber = Math.floor(Math.random() * 10000);
    return `${id}_${timestamp}_${randomNumber}.${extension}`;
};

export default useGenerateRandomFilename