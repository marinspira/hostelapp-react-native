import { createHostel } from '@/src/redux/slices/hostel';
import { configureStore } from '@reduxjs/toolkit';
import hostelReducer from '@/src/redux/slices/hostel';

global.fetch = jest.fn();

global.FormData = class {
    private _data: Record<string, any> = {};
    append(key: string, value: any) {
        this._data[key] = value;
    }
    entries() {
        return Object.entries(this._data);
    }
} as any;

global.Blob = class {
    constructor(content: any[], options: any) { }
} as any;

beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
});

afterAll(() => {
    (console.error as jest.Mock).mockRestore();
});

describe('createHostel thunk', () => {
    const hostelData = {
        name: 'Test Hostel',
        username: 'testhostel',
        currency: 'BRL',
        zip: '12345',
        street: 'Rua Teste',
        city: 'São Paulo',
        country: 'BR',
        phone: '1234567890',
        email: 'test@hostel.com',
        website: 'https://hostel.com',
        experience_with_volunteers: true,
        policies: true,
    };

    const image = new FormData();
    image.append('image', new Blob([''], { type: 'image/jpeg' }), 'test.jpg');

    const makeStore = () =>
        configureStore({
            reducer: {
                hostel: hostelReducer,
            },
        });

    it('should handle successful hostel creation', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            json: async () => ({
                success: true,
                message: 'Hostel created successfully',
                data: { id: '123', ...hostelData },
            }),
        });

        const store = makeStore();
        const result = await store.dispatch(createHostel({ hostelData, image }));

        expect(result.type).toBe('createHostel/hostel/fulfilled');
        const state = store.getState().hostel;

        expect(state.data.name).toBe('Test Hostel');
        expect(state.error).toBeNull();
        expect(state.loading).toBe(false);
    });

    it('should handle error during hostel creation', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: async () => ({ message: 'Creation failed' }),
        });

        const store = makeStore();
        const result = await store.dispatch(createHostel({ hostelData, image }));

        expect(result.type).toBe('createHostel/hostel/rejected');
        const state = store.getState().hostel;

        expect(state.error).toBe('Creation failed');
        expect(state.loading).toBe(false);
    });

    it('should return error if hostelData is missing required fields', async () => {
        const invalidHostelData = {
            ...hostelData,
            name: '', // Missing required name
        };

        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: async () => ({ message: 'Missing required field: name' }),
        });

        const store = makeStore();
        const result = await store.dispatch(createHostel({ hostelData: invalidHostelData as any, image }));

        expect(result.type).toBe('createHostel/hostel/rejected');
        const state = store.getState().hostel;

        expect(state.error).toBe('Missing required field: name');
    });

    it('should return error if image is missing', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: false,
            json: async () => ({ message: 'Image is required' }),
        });

        const store = makeStore();
        const result = await store.dispatch(createHostel({ hostelData, image: undefined as any }));

        expect(result.type).toBe('createHostel/hostel/rejected');
        const state = store.getState().hostel;

        expect(state.error).toBe('Image is required');
    });
});
