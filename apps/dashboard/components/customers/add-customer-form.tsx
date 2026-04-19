"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui";
import { Building, Call, DocumentText1, People, User } from "iconsax-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  COUNTERPARTY_GROUPS_CHANGED_EVENT,
  loadCounterpartyGroups,
  type CounterpartyGroup,
} from "../../lib/counterparty-groups";
import {
  INITIAL_LEGAL_ENTITY_VALUES,
  INITIAL_NATURAL_PERSON_VALUES,
  type LegalEntityFormValues,
  type NaturalPersonFormValues,
} from "../../lib/customer-form";

const tabTriggerClassName =
  "rounded-none border-b-2 border-transparent px-4 py-2.5 text-sm font-medium text-muted-foreground transition-none data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-foreground data-[state=active]:shadow-none";

export function AddCustomerForm() {
  const [groups, setGroups] = useState<CounterpartyGroup[]>([]);
  const [natural, setNatural] = useState<NaturalPersonFormValues>(
    INITIAL_NATURAL_PERSON_VALUES,
  );
  const [legal, setLegal] = useState<LegalEntityFormValues>(
    INITIAL_LEGAL_ENTITY_VALUES,
  );
  const [naturalSaved, setNaturalSaved] = useState(false);
  const [legalSaved, setLegalSaved] = useState(false);
  const [naturalGroupError, setNaturalGroupError] = useState(false);

  useEffect(() => {
    function sync() {
      setGroups(loadCounterpartyGroups());
    }
    sync();
    window.addEventListener(COUNTERPARTY_GROUPS_CHANGED_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(COUNTERPARTY_GROUPS_CHANGED_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  function setNaturalField<K extends keyof NaturalPersonFormValues>(
    key: K,
    val: string,
  ) {
    setNaturalSaved(false);
    if (key === "groupId") setNaturalGroupError(false);
    setNatural((prev) => ({ ...prev, [key]: val }));
  }

  function setLegalField<K extends keyof LegalEntityFormValues>(
    key: K,
    val: string,
  ) {
    setLegalSaved(false);
    setLegal((prev) => ({ ...prev, [key]: val }));
  }

  function handleNaturalSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (groups.length === 0) return;
    if (!natural.groupId) {
      setNaturalGroupError(true);
      return;
    }
    setNaturalGroupError(false);
    setNaturalSaved(true);
  }

  function handleLegalSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLegalSaved(true);
  }

  function resetNatural() {
    setNatural(INITIAL_NATURAL_PERSON_VALUES);
    setNaturalSaved(false);
    setNaturalGroupError(false);
  }

  function resetLegal() {
    setLegal(INITIAL_LEGAL_ENTITY_VALUES);
    setLegalSaved(false);
  }

  return (
    <div className="max-w-2xl space-y-6">
      <Tabs defaultValue="natural" dir="rtl">
        <TabsList className="mb-2 flex h-auto w-full flex-wrap justify-start gap-1 rounded-none border-b bg-transparent p-0">
          <TabsTrigger value="natural" className={tabTriggerClassName}>
            معرفی شخص حقیقی
          </TabsTrigger>
          <TabsTrigger value="legal" className={tabTriggerClassName}>
            معرفی شخص حقوقی
          </TabsTrigger>
        </TabsList>

        <TabsContent value="natural">
          <form onSubmit={handleNaturalSubmit} className="space-y-6">
            <Card className="rounded-2xl border-border/70">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold">
                  اطلاعات شخص حقیقی
                </CardTitle>
                <CardDescription>
                  اطلاعات طرف حساب حقیقی را وارد کنید.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <label
                      htmlFor="np-name"
                      className="text-sm font-medium leading-none"
                    >
                      نام و نام خانوادگی
                      <span className="mr-1 text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <User size={17} variant="Bulk" aria-hidden />
                      </span>
                      <Input
                        id="np-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        placeholder="نام و نام خانوادگی را وارد کنید"
                        value={natural.name}
                        onChange={(e) =>
                          setNaturalField("name", e.target.value)
                        }
                        className="!max-w-none pr-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label
                      htmlFor="np-group"
                      className="text-sm font-medium leading-none"
                    >
                      گروه طرف حساب
                      <span className="mr-1 text-destructive">*</span>
                    </label>
                    {groups.length === 0 ? (
                      <p className="rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-sm text-amber-900 dark:text-amber-100">
                        هنوز گروهی تعریف نشده است. ابتدا از بخش{" "}
                        <Link
                          href="/customers/groups"
                          className="font-medium underline underline-offset-2"
                        >
                          گروه‌های طرف حساب
                        </Link>{" "}
                        یک گروه ایجاد کنید.
                      </p>
                    ) : (
                      <>
                        <div className="relative">
                          <span className="pointer-events-none absolute right-3 top-1/2 z-10 -translate-y-1/2 text-muted-foreground">
                            <People size={17} variant="Bulk" aria-hidden />
                          </span>
                          <Select
                            value={natural.groupId || "__empty__"}
                            onValueChange={(v) =>
                              setNaturalField(
                                "groupId",
                                v === "__empty__" ? "" : v,
                              )
                            }
                          >
                            <SelectTrigger
                              id="np-group"
                              name="groupId"
                              className="!max-w-none pr-10 text-right"
                              dir="rtl"
                              aria-invalid={naturalGroupError}
                            >
                              <SelectValue placeholder="گروه را انتخاب کنید" />
                            </SelectTrigger>
                            <SelectContent
                              position="popper"
                              dir="rtl"
                              className="text-right"
                            >
                              <SelectItem value="__empty__">
                                انتخاب گروه
                              </SelectItem>
                              {groups.map((g) => (
                                <SelectItem key={g.id} value={g.id}>
                                  {g.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        {naturalGroupError && (
                          <p className="text-sm text-destructive">
                            انتخاب گروه طرف حساب الزامی است.
                          </p>
                        )}
                      </>
                    )}
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label
                      htmlFor="np-phone"
                      className="text-sm font-medium leading-none"
                    >
                      تلفن تماس
                      <span className="mr-1 text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Call size={17} variant="Bulk" aria-hidden />
                      </span>
                      <Input
                        id="np-phone"
                        name="phone"
                        type="tel"
                        dir="ltr"
                        autoComplete="tel"
                        required
                        placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                        value={natural.phone}
                        onChange={(e) =>
                          setNaturalField("phone", e.target.value)
                        }
                        className="!max-w-none pr-10 text-left"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label
                      htmlFor="np-notes"
                      className="text-sm font-medium leading-none"
                    >
                      یادداشت
                    </label>
                    <textarea
                      id="np-notes"
                      name="notes"
                      rows={3}
                      value={natural.notes}
                      onChange={(e) =>
                        setNaturalField("notes", e.target.value)
                      }
                      placeholder="توضیحات تکمیلی..."
                      className="block w-full max-w-none resize-y rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between gap-4 pb-6">
              {naturalSaved && (
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  اطلاعات شخص حقیقی ثبت شد.
                </p>
              )}
              <div className="ms-auto flex gap-3">
                <Button type="button" variant="outline" onClick={resetNatural}>
                  بازنشانی
                </Button>
                <Button
                  type="submit"
                  disabled={groups.length === 0}
                  className="bg-gradient-to-l from-zinc-900 to-zinc-800 shadow-lg shadow-zinc-900/20 hover:from-zinc-800 hover:to-zinc-700"
                >
                  ثبت طرف حساب
                </Button>
              </div>
            </div>
          </form>
        </TabsContent>

        <TabsContent value="legal">
          <form onSubmit={handleLegalSubmit} className="space-y-6">
            <Card className="rounded-2xl border-border/70">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold">
                  اطلاعات شخص حقوقی
                </CardTitle>
                <CardDescription>
                  اطلاعات طرف حساب حقوقی را وارد کنید.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2 sm:col-span-2">
                    <label
                      htmlFor="le-company"
                      className="text-sm font-medium leading-none"
                    >
                      نام شخص حقوقی
                      <span className="mr-1 text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Building size={17} variant="Bulk" aria-hidden />
                      </span>
                      <Input
                        id="le-company"
                        name="companyName"
                        type="text"
                        required
                        placeholder="نام شرکت یا موسسه را وارد کنید"
                        value={legal.companyName}
                        onChange={(e) =>
                          setLegalField("companyName", e.target.value)
                        }
                        className="!max-w-none pr-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="le-national-id"
                      className="text-sm font-medium leading-none"
                    >
                      شناسه ملی
                      <span className="mr-1 text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <DocumentText1 size={17} variant="Bulk" aria-hidden />
                      </span>
                      <Input
                        id="le-national-id"
                        name="nationalId"
                        type="text"
                        inputMode="numeric"
                        dir="ltr"
                        required
                        placeholder="۱۱ رقم"
                        value={legal.nationalId}
                        onChange={(e) =>
                          setLegalField("nationalId", e.target.value)
                        }
                        className="!max-w-none pr-10 text-left"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="le-economic"
                      className="text-sm font-medium leading-none"
                    >
                      کد اقتصادی
                    </label>
                    <Input
                      id="le-economic"
                      name="economicCode"
                      type="text"
                      dir="ltr"
                      placeholder="در صورت وجود"
                      value={legal.economicCode}
                      onChange={(e) =>
                        setLegalField("economicCode", e.target.value)
                      }
                      className="!max-w-none text-left"
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label
                      htmlFor="le-phone"
                      className="text-sm font-medium leading-none"
                    >
                      تلفن تماس
                      <span className="mr-1 text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                        <Call size={17} variant="Bulk" aria-hidden />
                      </span>
                      <Input
                        id="le-phone"
                        name="phone"
                        type="tel"
                        dir="ltr"
                        autoComplete="tel"
                        required
                        placeholder="مثال: ۰۲۱۸۸۸۸۸۸۸۸"
                        value={legal.phone}
                        onChange={(e) =>
                          setLegalField("phone", e.target.value)
                        }
                        className="!max-w-none pr-10 text-left"
                      />
                    </div>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label
                      htmlFor="le-address"
                      className="text-sm font-medium leading-none"
                    >
                      آدرس
                    </label>
                    <textarea
                      id="le-address"
                      name="address"
                      rows={2}
                      value={legal.address}
                      onChange={(e) =>
                        setLegalField("address", e.target.value)
                      }
                      placeholder="آدرس ثبت‌شده یا دفتر مرکزی..."
                      className="block w-full max-w-none resize-y rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label
                      htmlFor="le-notes"
                      className="text-sm font-medium leading-none"
                    >
                      یادداشت
                    </label>
                    <textarea
                      id="le-notes"
                      name="notes"
                      rows={3}
                      value={legal.notes}
                      onChange={(e) =>
                        setLegalField("notes", e.target.value)
                      }
                      placeholder="توضیحات تکمیلی..."
                      className="block w-full max-w-none resize-y rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between gap-4 pb-6">
              {legalSaved && (
                <p className="text-sm text-emerald-600 dark:text-emerald-400">
                  اطلاعات شخص حقوقی ثبت شد.
                </p>
              )}
              <div className="ms-auto flex gap-3">
                <Button type="button" variant="outline" onClick={resetLegal}>
                  بازنشانی
                </Button>
                <Button
                  type="submit"
                  className="bg-gradient-to-l from-zinc-900 to-zinc-800 shadow-lg shadow-zinc-900/20 hover:from-zinc-800 hover:to-zinc-700"
                >
                  ثبت طرف حساب
                </Button>
              </div>
            </div>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
