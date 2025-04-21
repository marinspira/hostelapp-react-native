export const createEvent = async (img, eventData) => {
    try {
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

        appendToFormData(eventData, 'event');
        img.forEach((value, key) => formData.append(key, value));

        const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/event/create`, {
            method: "POST",
            headers: {},
            credentials: "include",
            body: formData,
        });

        if (!response.ok) throw new Error(data.message || "Erro creating event");

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erro creating event:", error);
        throw error;
    }
};
