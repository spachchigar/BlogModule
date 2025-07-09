import { JSX } from 'react';
import { ComponentParams, ComponentRendering, Field, Image, ImageField, Text } from '@sitecore-jss/sitecore-jss-nextjs';
import { ComponentProps } from 'lib/component-props';
import { container, heading, pera, subHeading } from "../assets/tailwindcss"
// interface HeroBannerProps {
//   rendering: ComponentRendering & { params: ComponentParams };
//   params: ComponentParams;
//   fields: {
//     heading: Field<string>;
//     content: Field<string>;
//   };
// }
type HeroBannerProps = ComponentProps & {
  fields: {
    title: Field<string>;
    description: Field<string>;
    image: ImageField
  },
  params: {
    backgroundColor: Field<string>;
    textColor: Field<string>;
  }
};

export const Default = ({ fields, params }: HeroBannerProps): JSX.Element => {
  console.log("prams", params.backgroundColor)
  return (

    <div className={`${container()} ${params.backgroundColor}  `}>
      <div className='flex flex-col md:flex-row  justify-center items-center gap-[20px] min-h-[300px] p-5'>
        <div className={`${params.textColor} flex gap-3 flex-col items-center md:items-start `}>
          <h1 className={`${heading()}`}>
            <Text field={fields?.title} />
          </h1>
          {
            fields?.description && <p className={`${subHeading()} text-center`}>
              <Text field={fields?.description} />
            </p>
          }

        </div>
        <div className=''>
          <Image
            field={fields?.image}
            editable={false}
            imageParams={{ mw: 500, mh: 50 }}
            height="100"
            width="500"
            data-sample="other-attributes-pass-through"
          />

        </div>
      </div>
    </div>
  );
};
