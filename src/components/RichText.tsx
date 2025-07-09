import { JSX } from 'react';
import { Field, RichText as JssRichText } from '@sitecore-jss/sitecore-jss-nextjs';
import { container,button} from "../assets/tailwindcss"
interface Fields {
  Text: Field<string>;
}

export type RichTextProps = {
  params: { [key: string]: string };
  fields: Fields;
};


export const Default = (props: RichTextProps): JSX.Element => {
  const text = props.fields ? (
    <JssRichText field={props.fields.Text} />
  ) : (
    <span className="is-empty-hint">Rich text</span>
  );
  const id = props.params.RenderingIdentifier;

  return (
    <div className='mx-auto w-full'>
      <div
        className={`component rich-text mx-auto ${props?.params?.styles.trimEnd()} ${container()}`}
        id={id ? id : undefined}
      >
        <div className="component-content">{text}</div>
      </div>
    </div>

  );
};
