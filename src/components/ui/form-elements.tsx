"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { InputHTMLAttributes, LabelHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";
import gsap from "gsap";
import { Icon } from "@/components/ui/icon";

const FIELD_BASE =
    "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 transition-colors placeholder:text-gray-400 focus:border-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:opacity-50";

function Label({ children, className = "", ...props }: LabelHTMLAttributes<HTMLLabelElement>) {
    return (
        <label className={`block text-sm font-medium text-gray-700 ${className}`} {...props}>
            {children}
        </label>
    );
}

function Fieldset({
    legend,
    children,
    className = "",
}: {
    legend: ReactNode;
    children: ReactNode;
    className?: string;
}) {
    return (
        <fieldset className={`grid gap-2 ${className}`}>
            <legend className="mb-1 block text-sm font-medium text-gray-700">{legend}</legend>
            {children}
        </fieldset>
    );
}

function InputText({ className = "", ...props }: InputHTMLAttributes<HTMLInputElement>) {
    return <input className={`${FIELD_BASE} ${className}`} {...props} />;
}

function Textarea({ className = "", ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
    return <textarea className={`${FIELD_BASE} min-h-28 resize-y ${className}`} {...props} />;
}

type SelectOption = { value: string; label: string; disabled?: boolean };

type SelectProps = {
    id?: string;
    name?: string;
    options: SelectOption[];
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    required?: boolean;
    className?: string;
};

function SelectPanel({
    options,
    selectedValue,
    onSelect,
}: {
    options: SelectOption[];
    selectedValue: string;
    onSelect: (value: string) => void;
}) {
    const panelRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        if (!panelRef.current) return;
        const optionEls = panelRef.current.querySelectorAll("[data-select-option]");
        gsap.fromTo(panelRef.current, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.18, ease: "power2.out" });
        gsap.fromTo(
            optionEls,
            { opacity: 0, y: -6 },
            { opacity: 1, y: 0, duration: 0.16, ease: "power2.out", stagger: 0.025, delay: 0.02 },
        );
    }, []);

    return (
        <div
            ref={panelRef}
            role="listbox"
            data-lenis-prevent
            className="absolute top-full left-0 z-20 mt-2 max-h-64 w-full overflow-auto overscroll-contain rounded-md border border-gray-200 bg-white p-1.5 shadow-[0px_12px_32px_rgba(0,0,0,0.12)]"
        >
            {options.map((option) => (
                <button
                    key={option.value}
                    type="button"
                    data-select-option
                    role="option"
                    aria-selected={option.value === selectedValue}
                    disabled={option.disabled}
                    onClick={() => onSelect(option.value)}
                    className={`flex w-full items-center justify-between gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${
                        option.value === selectedValue
                            ? "bg-primary/10 text-primary-dark"
                            : "text-gray-700 hover:bg-gray-50"
                    }`}
                >
                    {option.label}
                    {option.value === selectedValue ? (
                        <Icon icon="lucide:check" className="text-primary size-4 shrink-0" />
                    ) : null}
                </button>
            ))}
        </div>
    );
}

function Select({
    id,
    name,
    options,
    value,
    defaultValue,
    onChange,
    placeholder,
    disabled = false,
    required = false,
    className = "",
}: SelectProps) {
    const [open, setOpen] = useState(false);
    const [internalValue, setInternalValue] = useState(
        defaultValue ?? (placeholder ? "" : (options[0]?.value ?? "")),
    );
    const selectedValue = value !== undefined ? value : internalValue;
    const selectedOption = options.find((option) => option.value === selectedValue);

    const rootRef = useRef<HTMLDivElement>(null);
    const triggerRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (!open) return;

        function handlePointerDown(event: MouseEvent) {
            if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
        }
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setOpen(false);
                triggerRef.current?.focus();
            }
        }

        document.addEventListener("mousedown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("mousedown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [open]);

    function selectOption(nextValue: string) {
        if (value === undefined) setInternalValue(nextValue);
        onChange?.(nextValue);
        setOpen(false);
        triggerRef.current?.focus();
    }

    return (
        <div ref={rootRef} className={`relative ${className}`}>
            <button
                ref={triggerRef}
                id={id}
                type="button"
                disabled={disabled}
                aria-haspopup="listbox"
                aria-expanded={open}
                onClick={() => setOpen((isOpen) => !isOpen)}
                className={`${FIELD_BASE} flex items-center justify-between gap-2 text-left`}
            >
                <span className={selectedOption ? "text-gray-900" : "text-gray-400"}>
                    {selectedOption?.label ?? placeholder}
                </span>
                <Icon
                    icon="lucide:chevron-down"
                    className={`size-4 shrink-0 text-gray-500 transition-transform duration-200 ease-in-out ${
                        open ? "rotate-180" : ""
                    }`}
                />
            </button>
            {open ? <SelectPanel options={options} selectedValue={selectedValue} onSelect={selectOption} /> : null}
            {/* Real <select> kept for native form submission (FormData, required validation) behind the styled trigger above. */}
            <select
                aria-hidden
                tabIndex={-1}
                name={name}
                value={selectedValue}
                required={required}
                disabled={disabled}
                onChange={() => {}}
                className="sr-only"
            >
                {placeholder ? (
                    <option value="" disabled hidden>
                        {placeholder}
                    </option>
                ) : null}
                {options.map((option) => (
                    <option key={option.value} value={option.value} disabled={option.disabled}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

type OptionProps = { label?: ReactNode } & Omit<InputHTMLAttributes<HTMLInputElement>, "type">;

function Checkbox({ label, id, className = "", ...props }: OptionProps) {
    return (
        <label htmlFor={id} className={`inline-flex cursor-pointer items-center gap-2.5 select-none ${className}`}>
            <span className="relative inline-flex size-5 shrink-0 items-center justify-center">
                <input
                    id={id}
                    type="checkbox"
                    className="peer size-5 shrink-0 cursor-pointer appearance-none rounded-md border border-gray-300 bg-white transition-colors checked:border-primary checked:bg-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50"
                    {...props}
                />
                <Icon
                    icon="lucide:check"
                    className="pointer-events-none absolute size-3.5 text-white opacity-0 peer-checked:opacity-100"
                />
            </span>
            {label ? <span className="text-sm text-gray-700">{label}</span> : null}
        </label>
    );
}

function Radio({ label, id, className = "", ...props }: OptionProps) {
    return (
        <label htmlFor={id} className={`inline-flex cursor-pointer items-center gap-2.5 select-none ${className}`}>
            <span className="relative inline-flex size-5 shrink-0 items-center justify-center">
                <input
                    id={id}
                    type="radio"
                    className="peer size-5 shrink-0 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white transition-colors checked:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-50"
                    {...props}
                />
                <span className="pointer-events-none absolute size-2.5 scale-0 rounded-full bg-primary transition-transform peer-checked:scale-100" />
            </span>
            {label ? <span className="text-sm text-gray-700">{label}</span> : null}
        </label>
    );
}

export { Label, Fieldset, InputText, Textarea, Select, Checkbox, Radio };
export type { SelectOption };
