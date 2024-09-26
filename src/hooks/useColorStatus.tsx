import { images } from 'assets';

export const getStatusClassName = (status: string) => {
    switch (status) {
        case 'success':
            return 'text-success';
        case 'error':
            return 'text-error';
        case 'pending':
            return 'text-warning';
        default:
            return 'text-gray-600';
    }
};

export const getStatusBgColor = (status: string) => {
    switch (status) {
        case 'success':
            return 'bg-green';
        case 'error':
            return 'bg-red';
        case 'pending':
            return 'bg-yellow';
        default:
            return 'bg-gray-100';
    }
};

export const getStatusBorderColor = (status: string) => {
    switch (status) {
        case 'success':
            return 'border-light-green-500';
        case 'error':
            return 'border-orange';
        case 'pending':
            return 'border-yellow';
        default:
            return 'border-gray-100';
    }
};

export const getStatusImage = (status: string) => {
    switch (status) {
        case 'success':
            return images.paymentSuccess;
        case 'error':
            return images.paymentError;
        case 'pending':
            return images.paymentPending;
        default:
            return images.paymentPending;
    }
};

export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
};

export const formatAmount = (amount: number) => {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
};

export const formatNumber = (number: number): string => {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(number);
};
