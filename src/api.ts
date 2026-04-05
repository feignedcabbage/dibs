const BASE_URL = 'https://dibstg.duckdns.org/api';

export const fetchBookings = async () => {
    const response = await fetch(`${BASE_URL}/bookings`);
    if (!response.ok) throw new Error('Network response failed');
    return response.json();
};

export const fetchUserProfile = async (email: string) => {
    const response = await fetch(`${BASE_URL}/users/${encodeURIComponent(email)}`);
    if (!response.ok) {
        if (response.status === 404) return { email, name: email.split('@')[0].replace('.', ' '), avatar: 'man' };
        throw new Error('Failed to fetch user');
    }
    return response.json();
};

export const updateUserProfile = async (profile: any) => {
    const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
    });
    if (!response.ok) throw new Error('POST failed');
    return response.json();
};

export const deleteUserProfile = async (email: string) => {
    const response = await fetch(`${BASE_URL}/users/${encodeURIComponent(email)}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('DELETE user failed');
    return response.json();
};

export const createBooking = async (booking: any) => {
    const response = await fetch(`${BASE_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    });
    if (!response.ok) throw new Error('POST failed');
    return response.json();
};

export const updateBooking = async (id: string, booking: any) => {
    const response = await fetch(`${BASE_URL}/bookings/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
    });
    if (!response.ok) throw new Error('PUT failed');
    return response.json();
};

export const deleteBooking = async (id: string) => {
    const response = await fetch(`${BASE_URL}/bookings/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('DELETE failed');
    return response.json();
};
