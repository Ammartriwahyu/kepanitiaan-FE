import { useState, useMemo, useEffect } from "react";
 
const ITEMS_PER_PAGE = 9;
 
export function useAspirasiPagination(filteredItems) {
    const [page, setPage] = useState(1);
 
    useEffect(() => {
        setPage(1);
    }, [filteredItems]);
 
    const visibleItems = useMemo(() => {
        return filteredItems.slice(0, page * ITEMS_PER_PAGE);
    }, [filteredItems, page]);
 
    const hasMore = visibleItems.length < filteredItems.length;
    const remaining = filteredItems.length - visibleItems.length;
 
    const loadMore = () => setPage((p) => p + 1);
 
    return { visibleItems, hasMore, remaining, loadMore };
}