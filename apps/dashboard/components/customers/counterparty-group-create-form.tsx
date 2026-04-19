"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Switch,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui";
import { People } from "iconsax-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  addCounterpartyGroup,
  COUNTERPARTY_PERMISSION_SECTIONS,
  createDefaultPermissions,
  isSectionFullyEnabled,
  setSectionPermissionsAll,
  type CounterpartyGroupPermissions,
} from "../../lib/counterparty-groups";

const permissionTabTriggerClassName =
  "rounded-none border-b-2 border-transparent px-3 py-2.5 text-xs font-medium text-muted-foreground transition-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none sm:px-4 sm:text-sm";

const defaultPermissionTab =
  COUNTERPARTY_PERMISSION_SECTIONS[0]?.id ?? "sales";

export function CounterpartyGroupCreateForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [permissions, setPermissions] = useState<CounterpartyGroupPermissions>(
    () => createDefaultPermissions(),
  );
  function setPermission(
    id: keyof CounterpartyGroupPermissions,
    value: boolean,
  ) {
    setPermissions((prev) => ({ ...prev, [id]: value }));
  }

  function toggleWholeSection(
    sectionId: (typeof COUNTERPARTY_PERMISSION_SECTIONS)[number]["id"],
    value: boolean,
  ) {
    setPermissions((prev) => setSectionPermissionsAll(prev, sectionId, value));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    addCounterpartyGroup({ name: trimmed, permissions });
    router.push("/customers/groups");
  }

  function handleReset() {
    setName("");
    setPermissions(createDefaultPermissions());
  }

  return (
    <div className="mx-auto w-full max-w-5xl space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="rounded-2xl border-border/70">
          <CardHeader className="pb-4">
            <CardTitle className="text-base font-semibold">
              ایجاد گروه طرف حساب
            </CardTitle>
            <CardDescription>
              نام گروه را وارد کنید؛ حوزه‌های دسترسی را در تب‌ها باز کنید و با
              سوییچ «همه» یا تک‌تک موارد را تنظیم کنید.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="group-name"
                className="text-sm font-medium leading-none"
              >
                نام گروه
                <span className="mr-1 text-destructive">*</span>
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <People size={17} variant="Bulk" aria-hidden />
                </span>
                <Input
                  id="group-name"
                  name="name"
                  type="text"
                  autoComplete="off"
                  required
                  placeholder="مثال: خریداران عمده"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="!max-w-none pr-10"
                />
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium leading-none">دسترسی‌ها</p>
              <Tabs
                defaultValue={defaultPermissionTab}
                dir="rtl"
                className="w-full"
              >
                <TabsList className="mb-3 flex h-auto min-h-0 w-full flex-wrap justify-start gap-0.5 rounded-none border-b border-border/70 bg-transparent p-0 sm:gap-1">
                  {COUNTERPARTY_PERMISSION_SECTIONS.map((section) => (
                    <TabsTrigger
                      key={section.id}
                      value={section.id}
                      className={permissionTabTriggerClassName}
                    >
                      {section.title}
                    </TabsTrigger>
                  ))}
                </TabsList>
                {COUNTERPARTY_PERMISSION_SECTIONS.map((section) => (
                  <TabsContent
                    key={section.id}
                    value={section.id}
                    className="mt-0 outline-none focus-visible:outline-none"
                  >
                    <div className="overflow-hidden rounded-xl border border-border/80 bg-muted/15">
                      <div className="flex items-center justify-between gap-3 border-b border-border/60 bg-muted/35 px-4 py-3">
                        <span className="text-sm font-semibold text-foreground">
                          {section.title}
                        </span>
                        <div className="flex shrink-0 items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            همهٔ موارد این تب
                          </span>
                          <Switch
                            checked={isSectionFullyEnabled(
                              permissions,
                              section.id,
                            )}
                            onCheckedChange={(c) =>
                              toggleWholeSection(section.id, c)
                            }
                            aria-label={`فعال‌سازی همه دسترسی‌های ${section.title}`}
                          />
                        </div>
                      </div>
                      <div className="divide-y divide-border/50">
                        {section.permissions.map((def) => (
                          <div
                            key={def.id}
                            className="flex items-center justify-between gap-4 px-4 py-3"
                          >
                            <span className="text-sm text-foreground">
                              {def.label}
                            </span>
                            <Switch
                              checked={permissions[def.id]}
                              onCheckedChange={(c) =>
                                setPermission(def.id, c)
                              }
                              aria-label={def.label}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </CardContent>
        </Card>

        <div className="flex flex-wrap items-center justify-end gap-4 pb-2">
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={handleReset}>
              بازنشانی فرم
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-l from-zinc-900 to-zinc-800 shadow-lg shadow-zinc-900/20 hover:from-zinc-800 hover:to-zinc-700"
            >
              ثبت گروه
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
