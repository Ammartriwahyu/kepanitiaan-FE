import { Card, CardContent } from "@/shared/components/shadcdn/card";

export default function Stat({
    icon: Icon,
    iconClassName = "text-primary",
    bgClassName = "bg-primary/10",
    value,
    label,
}) {
    return (
        <Card>
            <CardContent className="flex items-center gap-4">
                <div className={`rounded-full p-3 not-lg:hidden ${bgClassName}`}>
                    <Icon className={`size-5 ${iconClassName}`} />
                </div>
                <div>
                    <p className="text-2xl font-bold">{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                </div>
            </CardContent>
        </Card>
    );
}
