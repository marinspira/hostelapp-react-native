import { useMutation } from '@tanstack/react-query';

const createHostel = async ({hostelData, image}) => {

  const formData = new FormData();

   const appendToFormData = (data, prefix) => {
    for (const [key, value] of Object.entries(data)) {
        if (value === null || value === undefined) continue;

        const formattedKey = `${prefix}[${key}]`;

        if (typeof value === "boolean" || typeof value === "number") {
            formData.append(formattedKey, value.toString());
        } else if (value instanceof Date) {
            formData.append(formattedKey, value.toISOString());
        } else if (Array.isArray(value)) {
            value.forEach((v) => formData.append(`${formattedKey}[]`, v));
        } else {
            formData.append(formattedKey, value);
        }
    }
};
  appendToFormData(hostelData, 'hostel');

  if (image instanceof FormData) {
    for (const [key, value] of image.entries()) {
      formData.append(key, value);
    }
  }

  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/hostel/create`, {
      method: 'POST',
      headers: {},
      credentials: 'include',
      body: formData
    });

    const hostel = await response.json();

    if (!response.ok) {
      throw new Error(hostel.message || 'Erro ao criar hostel');
    }

    return hostel;

  } catch (error) {
    console.error('Error in createHostel service', error);
    throw error;
  }
};


export function useCreateHostel() {
  return useMutation({ mutationFn: createHostel });
}