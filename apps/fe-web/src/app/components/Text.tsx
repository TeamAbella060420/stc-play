import { useTranslation } from 'react-i18next';

interface CustomLabelProps 
{
  divStyle?: string;
  label: string;
  Icon?: JSX.Element;
  dir?:"ltr" | "rtl"
}

const Text = (props: CustomLabelProps) => 
{
  const { t } = useTranslation();
  return (
    <div dir={props?.dir} className={`${props?.divStyle} `}>
      {t(props.label)} {props?.Icon}
    </div>
  );
};

export default Text;
