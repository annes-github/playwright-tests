export function priceToNumber(priceText: string): number {
    const numericPrice = priceText.replace(/[^0-9.]/g, "");
    return parseFloat(numericPrice);
}

export function sortProductsByPrice(prices: string[], order: "ascending" | "descending"): string[] {
    if (order === "ascending") {
        return [...prices].sort((a, b) => priceToNumber(a) - priceToNumber(b));
    } else {
        return [...prices].sort((a, b) => priceToNumber(b) - priceToNumber(a));
    }
}