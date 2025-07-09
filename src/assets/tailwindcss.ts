import { tv } from "tailwind-variants";

export const container = tv({
    base: 'mx-auto py-0 px-[23px]  md:py-0 md:px-[39px] xl:max-w-[1220px] xl:p-0 ',
});


export const button = tv({
    base: 'text-[16px] cursor-pointer py-[11px] px-[37px] rounded-[0.1875rem] ',
    variants: {
        color: {
            primary: 'bg-white border border-[1px] border-solid btn-text-color ',
            secondary: 'bg-purple-500 text-white'
        },
        size: {
            sm: 'text-sm',
            md: 'text-base',
            lg: 'px-4 py-3 text-lg'
        }
    },
    compoundVariants: [
        {
            size: ['sm', 'md'],
            class: 'px-3 py-1'
        }
    ],
    defaultVariants: {
        color: 'primary'
    }
});

export const heading = tv({
    base: " text-[2.25rem] md:text-[4.375rem] font-bold leading-[5rem] "
})
export const subHeading=tv({
    base:"text-[1.125rem] font-semibold leading-6"
})
export const pera = tv({
    base: "text-[0.875rem] font-normal leading-4 "
})
