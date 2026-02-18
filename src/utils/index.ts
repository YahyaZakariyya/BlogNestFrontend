import { isAxiosError } from 'axios';
import type { ApiErrorResponse } from '@/types';

/**
 * Extracts a user-friendly error message from any error.
 * Handles Axios validation errors (422), auth errors (401/403), and generic errors.
 */
export function getErrorMessage(error: unknown): string {
    if (isAxiosError<ApiErrorResponse>(error)) {
        const response = error.response;

        if (!response) {
            return 'Network error. Please check your connection.';
        }

        // Validation errors — return first error message
        if (response.status === 422 && response.data.errors) {
            const firstField = Object.keys(response.data.errors)[0];
            return response.data.errors[firstField][0];
        }

        if (response.status === 401) {
            return 'Please login to continue.';
        }

        if (response.status === 403) {
            return 'You do not have permission to perform this action.';
        }

        if (response.status === 404) {
            return 'The requested resource was not found.';
        }

        if (response.status === 429) {
            return 'Too many requests. Please try again later.';
        }

        return response.data?.message || 'Something went wrong. Please try again.';
    }

    if (error instanceof Error) {
        return error.message;
    }

    return 'An unexpected error occurred.';
}

/**
 * Format a date string to a human-readable format.
 */
export function formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

/**
 * Format a date string to relative time (e.g., "2 hours ago").
 */
export function timeAgo(dateStr: string): string {
    const date = new Date(dateStr);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const intervals: [number, string][] = [
        [31536000, 'year'],
        [2592000, 'month'],
        [86400, 'day'],
        [3600, 'hour'],
        [60, 'minute'],
    ];

    for (const [secondsInUnit, unit] of intervals) {
        const interval = Math.floor(seconds / secondsInUnit);
        if (interval >= 1) {
            return `${interval} ${unit}${interval === 1 ? '' : 's'} ago`;
        }
    }

    return 'Just now';
}

/**
 * Estimate read time from text body.
 */
export function estimateReadTime(text: string): string {
    const wordsPerMinute = 200;
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(wordCount / wordsPerMinute));
    return `${minutes} min read`;
}

/**
 * Generate initials from a name.
 */
export function getInitials(name: string): string {
    return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

/**
 * Truncate text to a max length with ellipsis.
 */
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trimEnd() + '…';
}
