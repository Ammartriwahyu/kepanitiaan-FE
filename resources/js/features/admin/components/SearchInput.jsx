import { Input } from "@/shared/components/shadcdn/input";
import { Search } from "lucide-react";

export default function SearchInput({
    placeholder = "Cari...",
    value,
    onChange,
    className = "",
}) {
    return (
        <div className={`relative ${className}`}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <Input
                className="pl-9"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}
