import AdminLayout from "@/features/admin/layouts/AdminLayout";
import DeleteUserForm from "@/features/admin/components/account/DeleteAccount";
import UpdatePasswordForm from "@/features/admin/components/account/UpdatePassword";
import UpdateProfileInformationForm from "@/features/admin/components/account/UpdateInformation";
import { Card, CardContent } from "@/shared/components/shadcdn/card";
import { Head } from "@inertiajs/react";

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold text-foreground">
                    Akun
                </h2>
            }
        >

            <div className="py-8">
                <div className="mx-auto max-w-3xl space-y-6 px-4 sm:px-6 lg:px-8">
                    <Card>
                        <CardContent>
                            <UpdateProfileInformationForm
                                mustVerifyEmail={mustVerifyEmail}
                                status={status}
                            />
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <UpdatePasswordForm/>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent>
                            <DeleteUserForm />
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AdminLayout>
    );
}
