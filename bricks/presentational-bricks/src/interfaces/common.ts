export interface EasyopsEmptyProps {
  background?: string;
  description?: string;
  imageStyle?: React.CSSProperties;
  illustration?: IllustrationProps;
}

export interface IllustrationProps {
  name: string;
  category?: string;
}

export interface BrickWrapperConfig {
  empty?: EasyopsEmptyProps;
}
