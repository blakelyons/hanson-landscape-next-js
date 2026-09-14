import { Label, InputText, Textarea, Select, type SelectOption } from "@/components/ui/form-elements";

const SERVICE_OPTIONS: SelectOption[] = [
    { value: "residential-landscaping", label: "Residential Landscaping" },
    { value: "commercial-landscaping", label: "Commercial Landscaping" },
    { value: "garden-design", label: "Garden Design" },
    { value: "garden-maintenance", label: "Garden Maintenance" },
    { value: "garden-installation", label: "Garden Installation" },
    { value: "garden-repair", label: "Garden Repair" },
    { value: "garden-cleaning", label: "Garden Cleaning" },
    { value: "garden-planning", label: "Garden Planning" },
    { value: "garden-consulting", label: "Garden Consulting" },
];

export function ConsultationSection() {
    return (
        <section className="relative flex w-full items-start overflow-clip py-10 md:py-20">
            <div aria-hidden className="pointer-events-none absolute inset-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    alt=""
                    className="absolute size-full max-w-none object-cover"
                    src="/images/home/consultation-bg.jpg"
                />
                <div className="from-neutral-25 absolute inset-0 bg-linear-to-b to-[rgba(242,242,242,0)] to-[50.481%]" />
            </div>
            <div className="relative container flex h-full items-center justify-center md:justify-end">
                <div className="relative flex w-full flex-col items-center justify-center gap-2.5 rounded-xl bg-white p-8 lg:max-w-161.75">
                    <h2 className="font-serif-display w-full text-3xl leading-10.5 font-normal text-black not-italic">
                        Book a Consultation Today
                    </h2>
                    <div className="relative block w-full">
                        <form action="">
                            <div className="grid-auto-rows-max grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div className="grid grid-cols-1 gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <InputText id="name" name="name" type="text" />
                                </div>
                                <div className="grid grid-cols-1 gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <InputText id="email" name="email" type="email" />
                                </div>
                                <div className="grid grid-cols-1 gap-2">
                                    <Label htmlFor="phone">Phone</Label>
                                    <InputText id="phone" name="phone" type="tel" />
                                </div>
                                <div className="grid grid-cols-1 gap-2">
                                    <Label htmlFor="service">Select Service</Label>
                                    <Select
                                        id="service"
                                        name="service"
                                        options={SERVICE_OPTIONS}
                                        placeholder="Choose a service"
                                    />
                                </div>
                                <div className="col-span-2 grid grid-cols-1 gap-2">
                                    <Label htmlFor="message">Message</Label>
                                    <Textarea id="message" name="message" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
