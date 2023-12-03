export function capitalizeFirstLetter(str: string): string {
    if (!str) return '';
    const [firstLetter, ...rest] = str;
    return `${firstLetter.toUpperCase()}${rest.join("")}`;
}

