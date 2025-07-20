export async function sendLogsToBackend(logs) {
  try {
    const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_ADDRESS}/api/backoffice/frontend-logs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.EXPO_PUBLIC_BACKOFFICE_TOKEN}`
      },
      body: JSON.stringify(logs),
    });

    if (!response.ok) {
      throw new Error(`Server responded with status ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Failed to send logs:', error);
  }
}