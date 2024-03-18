export function addZerosDate(dateString: string): string {
    const parts = dateString.split('.');
    if (parts.length === 3) {
        const day = parts[0].length === 1 ? `0${parts[0]}` : parts[0];
        const month = parts[1].length === 1 ? `0${parts[1]}` : parts[1];
        const year = parts[2];
        return `${day}.${month}.${year}`;
    }
    return dateString;
}

