import { useForm } from "@inertiajs/react";
import { Button } from "@/shared/components/shadcdn/button";
import { Checkbox } from "@/shared/components/shadcdn/checkbox";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/shared/components/shadcdn/card";
import { Input } from "@/shared/components/shadcdn/input";
import { Label } from "@/shared/components/shadcdn/label";

export default function LoginForm({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: "",
        password: "",
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("login"), { onFinish: () => reset("password") });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-lg">Welcome back</CardTitle>
                <CardDescription>
                    Masukkan akun admin untuk melanjutkan
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <form onSubmit={submit} className="space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            value={data.email}
                            autoComplete="username"
                            autoFocus
                            onChange={(e) => setData("email", e.target.value)}
                            aria-invalid={!!errors.email}
                        />
                        {errors.email && (
                            <p className="text-sm text-destructive">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={data.password}
                            autoComplete="current-password"
                            onChange={(e) =>
                                setData("password", e.target.value)
                            }
                            aria-invalid={!!errors.password}
                        />
                        {errors.password && (
                            <p className="text-sm text-destructive">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="remember"
                            checked={data.remember}
                            onCheckedChange={(checked) =>
                                setData("remember", checked)
                            }
                        />
                        <Label
                            htmlFor="remember"
                            className="cursor-pointer font-normal text-sm text-muted-foreground"
                        >
                            Remember me
                        </Label>
                    </div>

                    <Button
                        type="submit"
                        className="w-full text-background hover:bg-foreground/80"
                        disabled={processing}
                    >
                        Log in
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
