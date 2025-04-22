export default function useAddMainDomain(urls: string[]): string[] {
    return urls.map((url) => `${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/${url.replace(/\\/g, '/')}`);
}
