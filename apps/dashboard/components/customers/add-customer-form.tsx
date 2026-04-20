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
  cn,
} from "@repo/ui";
import {
  Building,
  Buildings2,
  Call,
  DocumentText1,
  Global,
  Location,
  Money,
  NoteText,
  People,
  User,
} from "iconsax-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  COUNTERPARTY_GROUPS_CHANGED_EVENT,
  loadCounterpartyGroups,
  type CounterpartyGroup,
} from "../../lib/counterparty-groups";
import {
  cnFieldTextareaBase,
  cnInputLtrFaPlaceholder,
  cnInputPersian,
  cnTextareaPersian,
  cnTextareaRtlIconPadding,
} from "../../lib/form-input-direction";
import { formFieldIconClass } from "../../lib/form-field-icon";
import {
  INITIAL_LEGAL_ENTITY_VALUES,
  INITIAL_NATURAL_PERSON_VALUES,
  type LegalEntityFormValues,
  type NaturalPersonFormValues,
} from "../../lib/customer-form";
import { IRAN_PROVINCES, citiesForProvince } from "../../lib/iran-locations";

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
                  <div className="space-y-2">
                    <label
                      htmlFor="np-firstName"
                      className="text-sm font-medium leading-none"
                    >
                      نام
                      <span className="mr-1 text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute right-3 top-1/2 z-10 -translate-y-1/2">
                        <User
                          size={17}
                          variant="Linear"
                          color="currentColor"
                          className={formFieldIconClass.baseInfo}
                          aria-hidden
                        />
                      </span>
                      <Input
                        id="np-firstName"
                        name="firstName"
                        type="text"
                        dir="rtl"
                        autoComplete="given-name"
                        required
                        placeholder="نام"
                        value={natural.firstName}
                        onChange={(e) =>
                          setNaturalField("firstName", e.target.value)
                        }
                        className={cn("!max-w-none pr-10", cnInputPersian)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="np-lastName"
                      className="text-sm font-medium leading-none"
                    >
                      نام خانوادگی
                      <span className="mr-1 text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute right-3 top-1/2 z-10 -translate-y-1/2">
                        <User
                          size={17}
                          variant="Linear"
                          color="currentColor"
                          className={formFieldIconClass.baseInfo}
                          aria-hidden
                        />
                      </span>
                      <Input
                        id="np-lastName"
                        name="lastName"
                        type="text"
                        dir="rtl"
                        autoComplete="family-name"
                        required
                        placeholder="نام خانوادگی"
                        value={natural.lastName}
                        onChange={(e) =>
                          setNaturalField("lastName", e.target.value)
                        }
                        className={cn("!max-w-none pr-10", cnInputPersian)}
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
                            className="!max-w-none text-right [&>span]:!flex [&>span]:min-w-0 [&>span]:flex-1 [&>span]:items-center [&>span]:gap-2"
                            dir="rtl"
                            aria-invalid={naturalGroupError}
                          >
                            <span className="!flex min-w-0 flex-1 flex-row items-center gap-2">
                              <People
                                size={16}
                                variant="Linear"
                                color="currentColor"
                                className={cn("size-4", formFieldIconClass.baseInfo)}
                                aria-hidden
                              />
                              <SelectValue
                                placeholder="گروه طرف حساب"
                                className="min-w-0 flex-1 truncate"
                              />
                            </span>
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
                        {naturalGroupError && (
                          <p className="text-sm text-destructive">
                            انتخاب گروه طرف حساب الزامی است.
                          </p>
                        )}
                      </>
                    )}
                  </div>

                  <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                    <label
                      htmlFor="np-phone"
                      className="text-sm font-medium leading-none"
                    >
                      تلفن تماس
                      <span className="mr-1 text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute right-3 top-1/2 z-10 -translate-y-1/2">
                        <Call
                          size={17}
                          variant="Linear"
                          color="currentColor"
                          className={formFieldIconClass.baseInfo}
                          aria-hidden
                        />
                      </span>
                      <Input
                        id="np-phone"
                        name="phone"
                        type="tel"
                        dir="ltr"
                        autoComplete="tel"
                        required
                        placeholder="تلفن تماس"
                        value={natural.phone}
                        onChange={(e) =>
                          setNaturalField("phone", e.target.value)
                        }
                        className={cn("!max-w-none pr-10", cnInputLtrFaPlaceholder)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                    <label
                      htmlFor="np-economic"
                      className="text-sm font-medium leading-none"
                    >
                      کد اقتصادی
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute right-3 top-1/2 z-10 -translate-y-1/2">
                        <Money
                          size={17}
                          variant="Linear"
                          color="currentColor"
                          className={formFieldIconClass.baseInfo}
                          aria-hidden
                        />
                      </span>
                      <Input
                        id="np-economic"
                        name="economicCode"
                        type="text"
                        dir="ltr"
                        placeholder="کد اقتصادی"
                        value={natural.economicCode}
                        onChange={(e) =>
                          setNaturalField("economicCode", e.target.value)
                        }
                        className={cn("!max-w-none pr-10", cnInputLtrFaPlaceholder)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="np-province"
                      className="text-sm font-medium leading-none"
                    >
                      استان
                    </label>
                    <Select
                      value={natural.province || "__empty__"}
                      onValueChange={(v) => {
                        setNaturalSaved(false);
                        const p = v === "__empty__" ? "" : v;
                        setNatural((prev) => ({
                          ...prev,
                          province: p,
                          city: "",
                        }));
                      }}
                    >
                      <SelectTrigger
                        id="np-province"
                        name="province"
                        className="!max-w-none text-right [&>span]:!flex [&>span]:min-w-0 [&>span]:flex-1 [&>span]:items-center [&>span]:gap-2"
                        dir="rtl"
                      >
                        <span className="!flex min-w-0 flex-1 flex-row items-center gap-2">
                          <Global
                            size={16}
                            variant="Linear"
                            color="currentColor"
                            className={cn("size-4", formFieldIconClass.baseInfo)}
                            aria-hidden
                          />
                          <SelectValue placeholder="استان" className="min-w-0 flex-1 truncate" />
                        </span>
                      </SelectTrigger>
                      <SelectContent
                        position="popper"
                        dir="rtl"
                        className="text-right"
                      >
                        <SelectItem value="__empty__">انتخاب استان</SelectItem>
                        {IRAN_PROVINCES.map((p) => (
                          <SelectItem key={p} value={p}>
                            {p}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="np-city"
                      className="text-sm font-medium leading-none"
                    >
                      شهر
                    </label>
                    <Select
                      value={natural.city || "__empty__"}
                      disabled={!natural.province}
                      onValueChange={(v) =>
                        setNaturalField("city", v === "__empty__" ? "" : v)
                      }
                    >
                      <SelectTrigger
                        id="np-city"
                        name="city"
                        className="!max-w-none text-right [&>span]:!flex [&>span]:min-w-0 [&>span]:flex-1 [&>span]:items-center [&>span]:gap-2"
                        dir="rtl"
                      >
                        <span className="!flex min-w-0 flex-1 flex-row items-center gap-2">
                          <Buildings2
                            size={16}
                            variant="Linear"
                            color="currentColor"
                            className={cn("size-4", formFieldIconClass.baseInfo)}
                            aria-hidden
                          />
                          <SelectValue placeholder="شهر" className="min-w-0 flex-1 truncate" />
                        </span>
                      </SelectTrigger>
                      <SelectContent
                        position="popper"
                        dir="rtl"
                        className="max-h-60 text-right"
                      >
                        <SelectItem value="__empty__">انتخاب شهر</SelectItem>
                        {citiesForProvince(natural.province).map((c) => (
                          <SelectItem key={c} value={c}>
                            {c}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label
                      htmlFor="np-address"
                      className="text-sm font-medium leading-none"
                    >
                      آدرس
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute right-3 top-3 z-10">
                        <Location
                          size={17}
                          variant="Linear"
                          color="currentColor"
                          className={formFieldIconClass.baseInfo}
                          aria-hidden
                        />
                      </span>
                      <textarea
                        id="np-address"
                        name="address"
                        dir="rtl"
                        rows={2}
                        value={natural.address}
                        onChange={(e) =>
                          setNaturalField("address", e.target.value)
                        }
                        placeholder="آدرس"
                        className={cn(
                          "resize-y",
                          cnFieldTextareaBase,
                          cnTextareaPersian,
                          cnTextareaRtlIconPadding,
                        )}
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
                    <div className="relative">
                      <span className="pointer-events-none absolute right-3 top-3 z-10">
                        <NoteText
                          size={17}
                          variant="Linear"
                          color="currentColor"
                          className={formFieldIconClass.baseInfo}
                          aria-hidden
                        />
                      </span>
                      <textarea
                        id="np-notes"
                        name="notes"
                        dir="rtl"
                        rows={3}
                        value={natural.notes}
                        onChange={(e) =>
                          setNaturalField("notes", e.target.value)
                        }
                        placeholder="یادداشت"
                        className={cn(
                          "resize-y",
                          cnFieldTextareaBase,
                          cnTextareaPersian,
                          cnTextareaRtlIconPadding,
                        )}
                      />
                    </div>
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
                      <span className="pointer-events-none absolute right-3 top-1/2 z-10 -translate-y-1/2">
                        <Building
                          size={17}
                          variant="Linear"
                          color="currentColor"
                          className={formFieldIconClass.baseInfo}
                          aria-hidden
                        />
                      </span>
                      <Input
                        id="le-company"
                        name="companyName"
                        type="text"
                        dir="rtl"
                        required
                        placeholder="نام شخص حقوقی"
                        value={legal.companyName}
                        onChange={(e) =>
                          setLegalField("companyName", e.target.value)
                        }
                        className={cn("!max-w-none pr-10", cnInputPersian)}
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
                      <span className="pointer-events-none absolute right-3 top-1/2 z-10 -translate-y-1/2">
                        <DocumentText1
                          size={17}
                          variant="Linear"
                          color="currentColor"
                          className={formFieldIconClass.baseInfo}
                          aria-hidden
                        />
                      </span>
                      <Input
                        id="le-national-id"
                        name="nationalId"
                        type="text"
                        inputMode="numeric"
                        dir="ltr"
                        required
                        placeholder="شناسه ملی"
                        value={legal.nationalId}
                        onChange={(e) =>
                          setLegalField("nationalId", e.target.value)
                        }
                        className={cn("!max-w-none pr-10", cnInputLtrFaPlaceholder)}
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
                    <div className="relative">
                      <span className="pointer-events-none absolute right-3 top-1/2 z-10 -translate-y-1/2">
                        <Money
                          size={17}
                          variant="Linear"
                          color="currentColor"
                          className={formFieldIconClass.baseInfo}
                          aria-hidden
                        />
                      </span>
                      <Input
                        id="le-economic"
                        name="economicCode"
                        type="text"
                        dir="ltr"
                        placeholder="کد اقتصادی"
                        value={legal.economicCode}
                        onChange={(e) =>
                          setLegalField("economicCode", e.target.value)
                        }
                        className={cn("!max-w-none pr-10", cnInputLtrFaPlaceholder)}
                      />
                    </div>
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
                      <span className="pointer-events-none absolute right-3 top-1/2 z-10 -translate-y-1/2">
                        <Call
                          size={17}
                          variant="Linear"
                          color="currentColor"
                          className={formFieldIconClass.baseInfo}
                          aria-hidden
                        />
                      </span>
                      <Input
                        id="le-phone"
                        name="phone"
                        type="tel"
                        dir="ltr"
                        autoComplete="tel"
                        required
                        placeholder="تلفن تماس"
                        value={legal.phone}
                        onChange={(e) =>
                          setLegalField("phone", e.target.value)
                        }
                        className={cn("!max-w-none pr-10", cnInputLtrFaPlaceholder)}
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
                    <div className="relative">
                      <span className="pointer-events-none absolute right-3 top-3 z-10">
                        <Location
                          size={17}
                          variant="Linear"
                          color="currentColor"
                          className={formFieldIconClass.baseInfo}
                          aria-hidden
                        />
                      </span>
                      <textarea
                        id="le-address"
                        name="address"
                        dir="rtl"
                        rows={2}
                        value={legal.address}
                        onChange={(e) =>
                          setLegalField("address", e.target.value)
                        }
                        placeholder="آدرس"
                        className={cn(
                          "resize-y",
                          cnFieldTextareaBase,
                          cnTextareaPersian,
                          cnTextareaRtlIconPadding,
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-2 sm:col-span-2">
                    <label
                      htmlFor="le-notes"
                      className="text-sm font-medium leading-none"
                    >
                      یادداشت
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute right-3 top-3 z-10">
                        <NoteText
                          size={17}
                          variant="Linear"
                          color="currentColor"
                          className={formFieldIconClass.baseInfo}
                          aria-hidden
                        />
                      </span>
                      <textarea
                        id="le-notes"
                        name="notes"
                        dir="rtl"
                        rows={3}
                        value={legal.notes}
                        onChange={(e) =>
                          setLegalField("notes", e.target.value)
                        }
                        placeholder="یادداشت"
                        className={cn(
                          "resize-y",
                          cnFieldTextareaBase,
                          cnTextareaPersian,
                          cnTextareaRtlIconPadding,
                        )}
                      />
                    </div>
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
