const extractImageName = (pictureUrl) => {
    if (pictureUrl) {
        const parts = pictureUrl.split('\\');
        const publicIndex = parts.indexOf('public');
        if (publicIndex !== -1) {
            parts.splice(0, publicIndex + 1); // Remove 'public' and everything before it
        }
        if (parts.length > 0) {
            return '/' + parts.join('/'); // Join the remaining parts with '/'
        }
    }
    return null;
};

const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2
    }).format(price);
};

export { extractImageName, formatPrice };