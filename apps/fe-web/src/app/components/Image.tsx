interface imageProps {
  img: any;
  divStyle: string;
  imgStyle: string;
  children?:JSX.Element
}

const Image = (props: imageProps) => {
  return (
    <div className={`${props?.divStyle}`}>
      {props?.children}
      <img src={props?.img?.name ? URL.createObjectURL(props?.img) : props?.img} className={`${props?.imgStyle}`} />
    </div>
  );
};

export default Image;
